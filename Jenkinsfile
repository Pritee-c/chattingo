pipeline {
    agent any

    environment {
        // Jenkins credentials ID for Docker Hub (username/password)
        DOCKER_CREDENTIALS = credentials('docker-hub-creds')
    }

    stages {
        // Stage 1: Clone repository
        stage('Git Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/pritee-c/chattingo.git'
            }
        }

        // Stage 2: Build Docker images
        stage('Image Build') {
            steps {
                echo "Building Docker images for frontend and backend..."
                sh 'docker build -t chattingo_frontend:latest ./frontend'
                sh 'docker build -t chattingo_backend:latest ./backend'
            }
        }

        // Stage 3: Filesystem scan with Trivy
        stage('Filesystem Scan') {
            steps {
                echo "Scanning source code for vulnerabilities using Trivy (Docker)..."
                sh 'docker run --rm -v $PWD:/project aquasec/trivy fs /project/frontend'
                sh 'docker run --rm -v $PWD:/project aquasec/trivy fs /project/backend'
            }
        }

        // Stage 4: Image scan with Trivy
        stage('Image Scan') {
            steps {
                echo "Scanning Docker images for vulnerabilities using Trivy..."
                sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image chattingo_frontend:latest'
                sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image chattingo_backend:latest'
            }
        }

        // Stage 5: Push images to Docker Hub
        stage('Push to Registry') {
            steps {
                echo "Pushing Docker images to Docker Hub..."
                // Login to Docker Hub
                sh 'echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin'

                // Push frontend image
                sh 'docker tag chattingo_frontend:latest $DOCKER_CREDENTIALS_USR/chattingo_frontend:latest'
                sh 'docker push $DOCKER_CREDENTIALS_USR/chattingo_frontend:latest'

                // Push backend image
                sh 'docker tag chattingo_backend:latest $DOCKER_CREDENTIALS_USR/chattingo_backend:latest'
                sh 'docker push $DOCKER_CREDENTIALS_USR/chattingo_backend:latest'
            }
        }

        // Stage 6: Update docker-compose.yml with new tags
        stage('Update Compose') {
            steps {
                echo "Updating docker-compose with new image tags..."
                sh '''
                sed -i "s|chattingo_frontend:.*|chattingo_frontend:latest|g" docker-compose.yml
                sed -i "s|chattingo_backend:.*|chattingo_backend:latest|g" docker-compose.yml
                '''
            }
        }

        // Stage 7: Deploy using docker-compose
        stage('Deploy') {
            steps {
                echo "Deploying application using docker-compose..."
                // Remove old containers if they exist
                sh '''
                    docker rm -f chattingo_db || true
                    docker rm -f chattingo_frontend || true
                    docker rm -f chattingo_backend || true
                '''
                sh 'docker-compose down --remove-orphans'
                sh 'docker-compose up -d --force-recreate'
            }
        }
    }
}
