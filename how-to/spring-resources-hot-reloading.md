## intelliJ 기준

**build.gradle에 추가**
```
dependencies {
  developmentOnly 'org.springframework.boot:spring-boot-devtools'
}
```

**application.yml에 추가**
```
spring:
  devtools:
    livereload:
      enabled: true
```

**Gradle Setting**
Settings > Build, Execution, Deployment > Gradle > Build and run using: **Gradle**, Run tests using: **Gradle**

**compiler check**
Settings > Build, Execution, Deployment > Compiler > **Build project automatically 체크**

**auto-make check**
Settings > Advanced Settings > **Allow auto-make to start ... 체크**

**터미널에서 Gradle dependency 리로드**
./gradlew build --refresh-dependencies
