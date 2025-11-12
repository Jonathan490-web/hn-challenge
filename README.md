**🚀 Hacker News – Full-Stack Challenge**

✅ .NET Backend + Angular Frontend

✅ Automated BE/FE tests supported

✅ Single command to bootstrap & run locally



**📦 1) Requirements**

Before running the project, install:

Tool	Version	Link
.NET SDK	8.0+ / 9.0+	https://dotnet.microsoft.com/download

Node.js	20.19+ or 22.12+	https://nodejs.org

npm	Included with Node	

✅ Recommended: install Node using nvm-windows
https://github.com/coreybutler/nvm-windows/releases



**📥 2) Clone the Repository**

git clone https://github.com/Jonathan490-web/hn-challenge.git

cd hn-challenge

**🖥️ 3) Application URLs**

Component	URL

Web UI	http://localhost:4200

API Swagger	http://localhost:5129/swagger

API Base	http://localhost:5129/api

**📂 4) Project Structure**

hn-challenge/

├── Hn.Api/               → .NET API

│   ├── Controllers/

│   ├── Services/

│   ├── Tests/

│   └── ...

├── hn-web/               → Angular UI

│   ├── src/

│   └── ...

└── run.ps1               → bootstrap & start script



**✅ 5) Bootstrap Script (run.ps1)**
 Run Script in Powershell

This script will:

✅ Restore backend

✅ Optionally run backend tests

✅ Start .NET API at http://localhost:5129


✅ Install frontend dependencies

✅ Optionally run Angular unit tests

✅ Start Angular app at http://localhost:4200

 
**Pop-Location**


Write-Host "   UI : http://localhost:4200"

Write-Host "   API: http://localhost:5129/swagger"

Write-Host "Tip: If Angular fails due to Node version:"

Write-Host "     nvm install 22.12.0 ; nvm use 22.12.0"



**🧪 6) Running Tests Only**

**Backend**
dotnet test

**Frontend**

cd hn-web

npm ci

npx @angular/cli@latest test --watch=false --browsers=ChromeHeadless


**⚠️ Troubleshooting**

✅ API won’t start: port 5129 busy

taskkill /IM iisexpress.exe /F

✅ Angular startup fails: npx.ps1 blocked


We use cmd /c, so no signing needed.

✅ Node version problems

nvm install 22.12.0

nvm use 22.12.0
