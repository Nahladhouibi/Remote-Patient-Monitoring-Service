pipeline {
    agent any

    environment {
        DOCKER_PATH = "C:\\Programmes\\Docker\\cli-plugins"
        PATH = "${DOCKER_PATH}:${PATH}"
       
        NODEJS_PATH = "C:\\Programmes (x86)\\nodejs"
        SONAR_SCANNER_HOME = "C:\\Program Files\\sonar-scanner-5.0.1.3006-windows"
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout scm
                }
            }
        }
        stage('Install Dependencies and Run Tests') {
            steps {
                script {
                    bat 'npm install'
                    //bat 'npm test'
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarquabe') {
                    bat '"C:\\Program Files\\sonar-scanner-5.0.1.3006-windows\\bin\\sonar-scanner" -Dsonar.projectKey=microservices-security'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Construire l'image Docker avec élévation de privilèges
                    bat 'runas /noprofile /user:Administrator "docker build -t nahladhouibi/monitoringpatient:%BUILD_ID% ."'
                }
            }
        }
        stage('Tag Docker Image') {
            steps {
                script {
                    bat "docker tag nahladhouibi/monitoringpatient:%BUILD_ID% nahladhouibi/monitoringpatient:latest"
                }
            }
        }
        stage('Publish Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials-id', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        bat 'docker login -u %DOCKERHUB_USERNAME% -p %DOCKERHUB_PASSWORD%'
                        bat 'docker push nahladhouibi/monitoringpatient:%BUILD_ID%'
                        bat 'docker push nahladhouibi/monitoringpatient:latest'
                    }
                }
            }
        }
    }
}
