npm run build
tar -cvf quiz.tar dist/
scp quiz.tar debian@148.113.207.103:~/scripts/quiz.tar