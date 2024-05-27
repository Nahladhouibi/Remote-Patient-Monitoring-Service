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
                    // Installer les dépendances Node.js
                    bat 'npm install'
                    // Exécuter les tests (ajustez cette commande selon vos besoins)
                   // bat 'npm test'
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                // Exécuter l'analyse SonarQube
                withSonarQubeEnv('sonarquabe') {
                    bat '"C:\\Program Files\\sonar-scanner-5.0.1.3006-windows\\bin\\sonar-scanner" -Dsonar.projectKey=monitoringpatient'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Construire l'image Docker (ajustez la commande selon vos besoins)
                    bat 'docker build -t nahladhouibi/monitoringpatient:%BUILD_ID% .'
                }
            }
        }
        stage('Tag Docker Image') {
            steps {
                script {
                    // Renommer l'image Docker
                    bat "docker tag nahladhouibi/monitoringpatient:%BUILD_ID% nahladhouibi/monitoringpatient:latest"
                }
            }
        }
        stage('Publish Docker Image') {
            steps {
                script {
                    // Utiliser les credentials Jenkins pour se connecter à Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials-id', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        // Se connecter à Docker Hub
                        bat 'docker login -u %DOCKERHUB_USERNAME% -p %DOCKERHUB_PASSWORD%'
                        // Pousser l'image avec le tag spécifique
                        bat 'docker push nahladhouibi/monitoringpatient:%BUILD_ID%'
                        // Pousser l'image avec le tag latest
                        bat 'docker push nahladhouibi/monitoringpatient:latest'
                    }
                }
            }
        }
    }
}
