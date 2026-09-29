#!/bin/bash
# ============================================================
# SHORTLY-APP DEPLOYMENT SCRIPT
# Jalankan di server sebagai root atau dengan sudo
# ============================================================

set -e

# ---- KONFIGURASI ----
APP_DIR="/var/www/shortly-app"
DB_NAME="main_db"
DB_USER="root"
DEPLOY_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "============================================"
echo "  SHORTLY-APP DEPLOYMENT"
echo "============================================"

# ---- STEP 1: CEK ENVIRONMENT ----
echo ""
echo "[1/6] Checking environment..."
php -v | head -1
node -v
composer -V | head -1

# ---- STEP 2: BACKUP DATABASE ----
echo ""
echo "[2/6] Backing up database..."
BACKUP_FILE="backup_${DB_NAME}_$(date +%Y%m%d_%H%M%S).sql"
mysqldump -u "$DB_USER" "$DB_NAME" > "/root/$BACKUP_FILE"
echo "Backup saved to /root/$BACKUP_FILE"

# ---- STEP 3: SETUP .ENV ----
echo ""
echo "[3/6] Setting up .env..."
if [ ! -f "$APP_DIR/.env" ]; then
    cp "$DEPLOY_DIR/.env.production" "$APP_DIR/.env"
    cd "$APP_DIR"
    php artisan key:generate
    read -p "MySQL password untuk user 'sindangasih': " -s DB_PASSWORD
    echo ""
    sed -i "s/<MySQL password>/$DB_PASSWORD/" "$APP_DIR/.env"
    echo ".env created with APP_KEY generated."
else
    echo ".env already exists, skipping."
fi

# Sinkronkan DB_DATABASE ke main_db bila .env lama masih menunjuk database lain
if [ -f "$APP_DIR/.env" ] && grep -q '^DB_DATABASE=' "$APP_DIR/.env" && ! grep -q '^DB_DATABASE=main_db$' "$APP_DIR/.env"; then
    sed -i 's/^DB_DATABASE=.*/DB_DATABASE=main_db/' "$APP_DIR/.env"
    echo "DB_DATABASE in existing .env updated to main_db."
fi

# ---- STEP 4: INSTALL DEPENDENCIES & BUILD ----
echo ""
echo "[4/6] Installing dependencies..."
cd "$APP_DIR"
composer install --no-dev --optimize-autoloader
npm ci
npm run build

# ---- STEP 5: PERMISSIONS & CACHES ----
echo ""
echo "[5/6] Setting permissions and caching..."
chown -R www-data:www-data "$APP_DIR/storage" "$APP_DIR/bootstrap/cache"
chmod -R 775 "$APP_DIR/storage" "$APP_DIR/bootstrap/cache"
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan storage:link

# ---- STEP 6: MIGRATE ----
echo ""
echo "[6/6] Running migrations..."
php artisan migrate --force

echo ""
echo "============================================"
echo "  DEPLOYMENT SELESAI!"
echo "============================================"
echo ""
echo "Akses: https://sindangasih-makmur.com/shortly-app"
echo ""
echo "Verifikasi:"
echo "  supervisorctl status"
echo "  tail -f $APP_DIR/storage/logs/laravel.log"
echo "============================================"
