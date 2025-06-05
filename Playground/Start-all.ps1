Start-Process pwsh -ArgumentList '-NoExit', '-Command', 'dotnet run --project Playground.Server/Playground.Server.csproj --urls=http://localhost:5018'
Start-Process pwsh -ArgumentList '-NoExit', '-Command', 'dotnet run --project Playground.User/Playground.User.csproj --urls=http://localhost:5159'
Start-Process pwsh -ArgumentList '-NoExit', '-Command', 'dotnet run --project Playground.Gateway/Playground.Gateway.csproj --urls=http://localhost:7000'
Start-Process pwsh -ArgumentList '-NoExit', '-Command', 'cd playground.client; npm install; npm run dev'