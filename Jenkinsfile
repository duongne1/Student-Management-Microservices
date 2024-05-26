pipeline {
    agent any

    environment {
        NAMESPACE = 'duongne1/kttkpm-service'
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
                            withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                                docker.build("${NAMESPACE}:$course", './CourseService').push()
                            }
                        }
                    }
                }
                stage('Build erollment Service') {
                    steps {
                        script {
                           withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                                docker.build("${NAMESPACE}:$erollment", './EnrollmentServices').push()
                            }
                        }
                    }
                }
                stage('Build feedback Service') {
                    steps {
                        script {
                          withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                                docker.build("${NAMESPACE}:$feedback", './FeedbackService').push()
                            }
                        }
                    }
                }
                stage('Build grade Service') {
                    steps {
                        script {
                           withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                                docker.build("${NAMESPACE}:$grade", './GradeServices').push()
                            }
                        }
                    }
                }
                stage('Build user Service') {
                    steps {
                        script {
                          withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                                docker.build("${NAMESPACE}:$user", './UserService').push()
                            }
                        }
                    }
                }
                stage('Build Gateway Service') {
                    steps {
                        script {
                          withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                                docker.build("${NAMESPACE}:$GATEWAY_SERVICE_IMAGE_NAME", './GateWayService').push()
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