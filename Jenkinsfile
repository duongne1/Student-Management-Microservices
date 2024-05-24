pipeline {
    agent any

    environment {
        course = 'course-service'
        erollment = 'enrollment-service'
        feedback = 'feedback-service'
        grade = 'grade-service'
        GATEWAY_SERVICE_IMAGE_NAME = 'gateway-service'
        user = 'user-service'
        IMAGE_TAG = 'latest'
    }
    
    stages {   
        stage('Build and Push Docker Images') {
            parallel {
                stage('Build course Service') {
                    steps {
                        script {
                            // This step should not normally be used in your script. Consult the inline help for details.
                            withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                                docker.build("$course:$IMAGE_TAG", './CourseService').push()
                            }
                        }
                    }
                }
                stage('Build erollment Service') {
                    steps {
                        script {
                           withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                                docker.build("$erollment:$IMAGE_TAG", './EnrollmentServices').push()
                            }
                        }
                    }
                }
                stage('Build feedback Service') {
                    steps {
                        script {
                          withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                                docker.build("$feedback:$IMAGE_TAG", './feedbackService').push()
                            }
                        }
                    }
                }
                stage('Build grade Service') {
                    steps {
                        script {
                           withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                                docker.build("$grade:$IMAGE_TAG", './GradeServices').push()
                            }
                        }
                    }
                }
                stage('Build user Service') {
                    steps {
                        script {
                          withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                                docker.build("$user:$IMAGE_TAG", './UserService').push()
                            }
                        }
                    }
                }
                stage('Build Gateway Service') {
                    steps {
                        script {
                          withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                                docker.build("$GATEWAY_SERVICE_IMAGE_NAME:$IMAGE_TAG", './GateWayService').push()
                            }
                        }
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}