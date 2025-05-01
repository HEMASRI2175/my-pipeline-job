pipeline {
    agent any

    environment {
        MAVEN_HOME = '/usr/share/maven'
        AWS_REGION = 'ap-southeast-2'
        EC2_HOST = 'ec2-54-252-199-25.ap-southeast-2.compute.amazonaws.com'
        EC2_USER = 'ubuntu'
        JAR_FILE = 'target/my-app.jar'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/HEMASRI2175/my-pipeline-job.git'
            }
        }

        stage('Build') {
            steps {
                script {
                    sh "${MAVEN_HOME}/bin/mvn clean install"
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    sh "${MAVEN_HOME}/bin/mvn test"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'EC2-SSH-Key', keyFileVariable: 'SSH_KEY')]) {
                        sh "scp -o StrictHostKeyChecking=no -i ${SSH_KEY} ${JAR_FILE} ${EC2_USER}@${EC2_HOST}:/home/${EC2_USER}/app.jar"
                        sh """
                        ssh -o StrictHostKeyChecking=no -i ${SSH_KEY} ${EC2_USER}@${EC2_HOST} << EOF
                        sudo systemctl stop my-java-app || true
                        nohup java -jar /home/${EC2_USER}/app.jar &
                        sudo systemctl start my-java-app
                        EOF
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
        }
        success {
            echo 'Deployment was successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
