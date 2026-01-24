cd "C:\Users\nicco\Desktop\Code\My-WebSite\sphinx-notes\project/build"
start /b python -m http.server 8000 --bind 0.0.0.0
timeout /t 2 /nobreak
explorer "http://localhost:8000/V. 1.0/English/index.html"