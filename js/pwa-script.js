// Relocated from root to js/pwa-script.js
(function() {
	try {
		const ensureManifest = () => {
			const relLinks = Array.from(document.querySelectorAll('link[rel="manifest"]'));
			const hasRelative = relLinks.some(l => l.getAttribute('href') && !l.getAttribute('href').startsWith('/'));
			if (!hasRelative) {
				const placeholder = document.getElementById('manifest-placeholder');
				if (placeholder) {
					placeholder.setAttribute('href', 'manifest.json');
				} else {
					const link = document.createElement('link');
					link.rel = 'manifest';
					link.href = 'manifest.json';
					document.head.appendChild(link);
				}
			}
		};
		const registerSW = async () => {
			if ('serviceWorker' in navigator) {
				try {
					await navigator.serviceWorker.register('./service-worker.js');
				} catch (e) {}
			}
		};
		ensureManifest();
		window.addEventListener('load', registerSW);
	} catch (_) {}
})();
