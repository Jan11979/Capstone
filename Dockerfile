FROM openjdk:17

MAINTAINER Jan <jan@gmail.com>

ADD backend/target/wlc.jar wlc.jar

CMD [ "sh", "-c", "java  -jar /wlc.jar" ]
#CMD [ "sh", "-c", "java -Dserver.port=$PORT -Dspring.data.mongodb.uri=$URI -jar /wlc.jar" ]