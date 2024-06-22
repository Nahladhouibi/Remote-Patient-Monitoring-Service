pipeline {
    agent any

    environment {
        DOCKER_PATH = "C:\\Programmes\\Docker\\cli-plugins"
        PATH = "${DOCKER_PATH}:${PATH}"
        KUBECONFIG = "C:\\Program Files\\Jenkins\\.kube\\config"
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
                    bat 'npm test'
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarquabe') {
                    bat '"C:\\Program Files\\sonar-scanner-5.0.1.3006-windows\\bin\\sonar-scanner" -Dsonar.projectKey=remote'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Construire l'image Docker avec élévation de privilèges
                    bat 'docker build -t nahladhouibi/monitoringpatient:%BUILD_ID% .'
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
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        bat 'docker login -u %DOCKERHUB_USERNAME% -p %DOCKERHUB_PASSWORD%'
                        bat 'docker push nahladhouibi/monitoringpatient:%BUILD_ID%'
                        bat 'docker push nahladhouibi/monitoringpatient:latest'
                    }
                }
            }
        }
        stage('Deploy with kubectl') {
            steps {
                script {
                    bat '''
                    kubectl get namespace remote-patient || kubectl create namespace remote-patient
                    kubectl apply -f db/config.yml -n remote-patient
                    kubectl apply -f db/postgres.deployment.yml -n remote-patient
                    kubectl apply -f db/postgres-pv.yml -n remote-patient
                    kubectl apply -f db/postgres-pvc.yml -n remote-patient
                    kubectl apply -f db/postgres.service.yml -n remote-patient
                    kubectl apply -f db/secret.yml -n remote-patient
                    kubectl apply -f remote.deployment.yml -n remote-patient
                    kubectl apply -f remote.service.yml -n remote-patient
                    kubectl apply -f secret.yml -n remote-patient
                    '''
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Deployment succeeded!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
