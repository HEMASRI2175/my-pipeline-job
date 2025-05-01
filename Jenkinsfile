pipeline {
    agent any

    environment {
        MAVEN_HOME = '/usr/share/maven'
        AWS_REGION = 'ap-southeast-2'  // Replace with your AWS region
        EC2_HOST = 'ec2-54-252-199-25.ap-southeast-2.compute.amazonaws.com'  // EC2 Public DNS or IP
        EC2_USER = 'ubuntu'  // EC2 Username (use 'ec2-user' for Amazon Linux)
        JAR_FILE = 'target/my-app.jar'  // Path to your JAR file
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
                    // Use the SSH private key from Jenkins credentials
                    withCredentials([sshUserPrivateKey(credentialsId: 'EC2-SSH-Key', keyFileVariable: 'SSH_KEY')]) {
                        // Copy the .jar file to EC2 instance using SCP
                        sh """
                        scp -o StrictHostKeyChecking=no -i ${SSH_KEY} ${JAR_FILE} ${EC2_USER}@${EC2_HOST}:/home/${EC2_USER}/app.jar
                        """

                        // SSH into EC2 and run the application
                        sh """
                        ssh -o StrictHostKeyChecking=no -i ${SSH_KEY} ${EC2_USER}@${EC2_HOST} << EOF
                        # Stop the existing application (if running)
                        sudo systemctl stop my-java-app || true
                        # Run the new application
                        nohup java -jar /home/${EC2_USER}/app.jar &
                        # Optionally, start the application service (if using systemd)
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
