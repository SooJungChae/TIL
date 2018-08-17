# Deploy Node.js project in iis7

### 1. Make environment following link
[https://github.com/tjanczuk/iisnode](https://github.com/tjanczuk/iisnode)

- Windows Vista, Windows 7, Windows 8, Windows Server 2008, or Windows Server 2012
- IIS 7.x with IIS Management Tools and ASP.NET
- WebSocket functionality requires IIS 8.x on Windows 8 or Windows Server 2012
- **URL rewrite module for IIS**
- **Latest node.js build for Windows**

### 2. test 
- Install iisnode for IIS 7.x/8.x: x86 or x64 - choose bitness matching your system
- To set up samples, from the administrative command prompt call %programfiles%\iisnode\setupsamples.bat
- Go to http://localhost/node

------- 
# Errors

### - 500.19
Problem) Can't access page because wrong configuration data
![500.19 error](https://user-images.githubusercontent.com/12723983/44257114-062fb380-a246-11e8-87e8-23c1b28c6a8f.png)
Resolve) I reset the delegation then it turns back to "Read only". Therefore I set it to "Read/Write" as mentioned [here](https://github.com/tjanczuk/iisnode/issues/52)

### - 403.14
![403.14 error](https://user-images.githubusercontent.com/12723983/44257306-9241db00-a246-11e8-9957-717ac0fb13bc.png)

Resolve) **Directory Search -> Use**

