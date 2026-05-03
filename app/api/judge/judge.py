import json
import socket
import os
import subprocess

def get_global_ip():
    try:
        import urllib.request
        with urllib.request.urlopen('https://api.ipify.org') as res:
            return res.read().decode()
    except Exception:
        return "取得失敗"

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "取得失敗"

def check_access(ip, port, timeout=2):
    try:
        s = socket.create_connection((ip, port), timeout=timeout)
        s.close()
        return "OK"
    except Exception:
        return "NG"

def main():
    DNS_SERVER = os.environ.get("DNS_SERVER", "192.168.0.1")
    ROUTER_IP = os.environ.get("ROUTER_IP", "192.168.0.1")
    result = {
        "global_ip": get_global_ip(),
        "local_ip": get_local_ip(),
        "dns_server": DNS_SERVER,
        "dns_access": check_access(DNS_SERVER, 53),
        "router_ip": ROUTER_IP,
        "router_access": check_access(ROUTER_IP, 80),
    }
    print(json.dumps(result, ensure_ascii=False))

if __name__ == "__main__":
    main()
