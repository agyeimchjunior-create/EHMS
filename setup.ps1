$dirs = @("my-react-app", "admin", "partner")
foreach ($dir in $dirs) {
    Set-Location "c:\Users\USER\Desktop\work\EMHS\$dir"
    npm install tailwindcss @tailwindcss/vite "@tailwindcss/vite@4.0.0" "tailwindcss@4.0.0"
    npm install react-router-dom lucide-react zustand
}

Set-Location "c:\Users\USER\Desktop\work\EMHS"
mkdir -Force backend
Set-Location "c:\Users\USER\Desktop\work\EMHS\backend"
npm init -y
npm install express cors dotenv jsonwebtoken pg
npm install --save-dev typescript @types/express @types/node @types/cors ts-node-dev tsx
npx tsc --init
