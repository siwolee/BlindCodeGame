# Use the OpenJDK 11 as the base image
FROM openjdk:11-jdk

# Set the working directory inside the container
WORKDIR /app

# Copy the Gradle wrapper and build files first
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Copy the source code
COPY src src

# Build the project
# yml에서 도커에서 구동될 mysql의 컨테이너명을 넣어주는데 이 부분 때문에 패키징 시 테스트에 실패하는 것 같습니다..
RUN ./gradlew clean build -x test

# Specify the JAR file (dynamically referencing it)
# ARG JAR_FILE=build/libs/*.jar
ARG JAR_FILE=build/libs/blind-0.0.1-SNAPSHOT.jar

# # Copy the built JAR into the container
# COPY ${JAR_FILE} app.jar
# RUN cp build/libs/blind-0.0.1-SNAPSHOT.jar ./app.jar && chmod 777 ./app.jar

# # Expose the port that the application will run on
EXPOSE 8080

# # Set the entry point for the container
ENTRYPOINT ["java", "-jar", "build/libs/blind-0.0.1-SNAPSHOT.jar"]

# CMD tail -f /dev/null
