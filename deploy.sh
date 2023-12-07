rm linebot.bk
mv linebot linebot.bk
mv linebot-server-expr-linux linebot
chmod +x linebot
pm2 restart linebot
sleep 2
pm2 ls
