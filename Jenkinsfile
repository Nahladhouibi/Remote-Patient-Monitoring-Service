pipeline {
    agent any

    stages {
        stage('Publish Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        bat 'docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD'
                        bat "docker push nahladhouibi/monitoringpatient:${BUILD_ID}"
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
}
