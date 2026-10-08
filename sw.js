// インストール要件を満たすための最小のService Worker（キャッシュはしない＝常に最新・Firebaseも常に生）
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function(){});
