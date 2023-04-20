FROM jenkins/jenkins:latest

ENV JAVA_OPTS -Djenkins.install.runSetupWizard=false
ENV CASC_JENKINS_CONFIG /var/jenkins_home/casc.yaml
# COPY /jenkins-setup/casc.yaml /var/jenkins_home/casc/casc.yaml
# COPY /jenkins-setup/plugins.txt /usr/share/jenkins/ref/
COPY /jenkins-setup/ /usr/share/jenkins/ref/
USER root
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt --plugins delivery-pipeline-plugin:1.3.2 deployit-plugin
# RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/ref/plugins.txt
# ENV CASC_JENKINS_CONFIG /var/jenkins_home/casc/casc.yaml
