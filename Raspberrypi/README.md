# Raspberry Pi のセットアップ

## hostapd の設定

```bash
sudo apt install hostapd
sudo cp hostapd.conf /etc/hostapd.conf
sudo cp hostapd-user.service /etc/systemd/system/hostapd-user.service
sudo systemctl enable --now hostapd-user.service
```

## dnsmasq の設定

```bash
sudo apt install dnsmasq
sudo cp dnsmasq-user.service /etc/systemd/system/dnsmasq-user.service
sudo systemctl enable --now dnsmasq-user.service
```

## Web サーバーの設定

```bash
sudo apt install npm
npm install
cp web-user.service /etc/systemd/system/web-user.service
loginctl enable-linger $USER
sudo systemctl enable --now web-user.service
```
