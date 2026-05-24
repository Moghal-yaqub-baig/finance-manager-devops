pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'moghalyaqubbaig'
        IMAGE_NAME     = 'finance-manager'
        IMAGE_TAG      = "${BUILD_NUMBER}"
    }

    stages {
        stage('Fetch Source Code') {
            steps {
                checkout scm
            }
        }

        stage('Compile & Build Docker Image') {
            steps {
                script {
                    echo "Starting build process for ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}..."
                    sh "docker build -t ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} ."
                    sh "docker tag ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} ${DOCKERHUB_USER}/${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', 
                                                      usernameVariable: 'DOCKER_USER', 
                                                      passwordVariable: 'DOCKER_PASS')]) {
                        sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                        sh "docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
                        sh "docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:latest"
                    }
                }
            }
        }

        stage('Deploy Live App Server') {
            steps {
                script {
                    echo "Pulling production artifact and standing up the app on the host network..."
                    // Removes older container instances so there are no naming conflicts
                    sh "docker rm -f finance-manager-container || true"
                    
                    // Pulls down the fresh container image directly from your registry
                    sh "docker pull ${DOCKERHUB_USER}/${IMAGE_NAME}:latest"
                    
                    // CRITICAL FIX: Backslashes escape the nested quotes so Jenkins can read --network="host" cleanly
                    sh "docker run -d --network=\"host\" --name finance-manager-container ${DOCKERHUB_USER}/${IMAGE_NAME}:latest"
                }
            }
        }
    }

    post {
        always {
            echo "Cleaning up local build remnants to preserve server storage..."
            sh "docker rmi -f ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} || true"
            sh "docker rmi -f ${DOCKERHUB_USER}/${IMAGE_NAME}:latest || true"
        }
        success {
            echo "Pipeline built and delivered successfully!"
        }
        failure {
            echo "Pipeline execution failed. Inspect build logs for diagnostic traces."
        }
    }
}