// Force scroll to top on page load/reload
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Mapping for music platforms
const musicPlatforms = {
    'spotify': { url: 'https://open.spotify.com/search', usesPath: true },
    'applemusic': { url: 'https://music.apple.com/us/search', paramName: 'term' },
    'youtubemusic': { url: 'https://music.youtube.com/search', paramName: 'q' },
    'soundcloud': { url: 'https://soundcloud.com/search', paramName: 'q' },
    'deezer': { url: 'https://www.deezer.com/search', usesPath: true },
    'bandcamp': { url: 'https://bandcamp.com/search', paramName: 'q' },
    'tidal': { url: 'https://listen.tidal.com/search', paramName: 'q' },
    'amazonmusic': { url: 'https://music.amazon.com/search', paramName: 'keywords' },
    'lastfm': { url: 'https://www.last.fm/search', paramName: 'q' },
    'pandora': { url: 'https://www.pandora.com/search', paramName: 'query' },
    'iheartradio': { url: 'https://www.iheart.com/search', paramName: 'q' },
    'tunein': { url: 'https://tunein.com/search/', paramName: 'query' },
    'audiomack': { url: 'https://audiomack.com/search', paramName: 'q' },
    '7digital': { url: 'https://us.7digital.com/search', paramName: 'q' },
    'beatport': { url: 'https://www.beatport.com/search', paramName: 'q' },
    'mixcloud': { url: 'https://www.mixcloud.com/search/', paramName: 'q' },
    'napster': { url: 'https://app.napster.com/search', paramName: 'query' },
    'qobuz': { url: 'https://www.qobuz.com/search', paramName: 'q' },
    'boomplay': { url: 'https://www.boomplay.com/search', paramName: 'q' },
    'anghami': { url: 'https://play.anghami.com/search', paramName: 'query' },
    'jamendo': { url: 'https://www.jamendo.com/search', paramName: 'q' },
    'nts': { url: 'https://www.nts.live/search', paramName: 'q' },
    'jazzradio': { url: 'https://www.jazzradio.com/search', paramName: 'searchterm' },
    'musopen': { url: 'https://musopen.org/search', paramName: 'q' },
    'idagio': { url: 'https://app.idagio.com/search', paramName: 'q' },
    'primephonic': { url: 'https://www.primephonic.com/search', paramName: 'q' },
    'jango': { url: 'https://www.jango.com/search', paramName: 'q' },
    'gaana': { url: 'https://gaana.com/search', paramName: 'q' },
    'jiosaavn': { url: 'https://www.jiosaavn.com/search', paramName: 'q' },
    'audius': { url: 'https://audius.co/search', paramName: 'q' }
};

// References to new Music mode elements
const musicModeButton = document.getElementById('music-mode-button');
const musicForm = document.getElementById('music-form');
const musicSelect = document.getElementById('music-select');
const musicInput = document.getElementById('music-input');
const voiceMusicButton = document.getElementById('voice-music-button');
const musicContainer = document.getElementById('music-container');
const musicMoreButton = document.getElementById('music-more-button');
const musicMoreContainer = document.getElementById('music-more-container');
const musicMoreButtonContainer = document.getElementById('music-more-button-container');
const musicAddServiceButton = document.getElementById('music-add-service-button');
const musicAddServiceContainer = document.getElementById('music-add-service-container');

// Variable for tracking music more services visibility
let isMusicMoreVisible = false;

// Function to update music platform
function updateMusic() {
    const selectedMusic = musicSelect.value;
    const music = musicPlatforms[selectedMusic];
    
    if (music) {
        if (music.usesPath) {
            musicForm.action = music.url;
            musicInput.name = '';
        } else {
            musicForm.action = music.url;
            musicInput.name = music.paramName;
        }
        
        // Update active buttons
        document.querySelectorAll('#music-container .engine-button').forEach(button => {
            if (button.dataset.music === selectedMusic) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        document.querySelectorAll('#music-more-container .engine-button').forEach(button => {
            if (button.dataset.music === selectedMusic) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    // Focus on music search input
    setTimeout(() => {
        musicInput.focus();
    }, 10);
}

// Music mode switching functionality
musicModeButton.addEventListener('click', function() {
    // Switch to music mode
    searchModeButton.classList.remove('active');
    shoppingModeButton.classList.remove('active');
    archiveModeButton.classList.remove('active');
    musicModeButton.classList.add('active');
    
    // Hide other forms, show music form
    searchForm.classList.add('hide');
    shoppingForm.classList.add('hide');
    archiveForm.classList.add('hide');
    musicForm.classList.remove('hide');
    
    // Hide other containers, show music container
    enginesContainer.classList.add('hide');
    shoppingContainer.classList.add('hide');
    archiveContainer.classList.add('hide');
    musicContainer.classList.remove('hide');
    
    // Show/hide add service buttons
    addServiceContainer.style.display = 'none';
    shoppingAddServiceContainer.style.display = 'none';
    archiveAddServiceContainer.style.display = 'none';
    musicAddServiceContainer.style.display = 'flex';
    
    // Show more services buttons
    showMoreButton.parentElement.style.display = 'none';
    shoppingMoreButtonContainer.style.display = 'none';
    archiveMoreButtonContainer.style.display = 'none';
    musicMoreButtonContainer.style.display = 'flex';
    
    // Reset more services visibility
    if (!isMusicMoreVisible) {
        musicMoreContainer.classList.add('hide');
        musicMoreButton.innerHTML = '<span>More</span><span>+</span>';
    } else {
        musicMoreContainer.classList.remove('hide');
        musicMoreButton.innerHTML = '<span>Less</span>';
    }
    
    // Hide other more services containers
    moreServicesContainer.classList.add('hide');
    shoppingMoreContainer.classList.add('hide');
    archiveMoreContainer.classList.add('hide');
    
    // Focus on music input
    setTimeout(() => {
        musicInput.focus();
    }, 10);
});


// Music Show More/Less button functionality
musicMoreButton.addEventListener('click', function() {
    isMusicMoreVisible = !isMusicMoreVisible;
    
    if (isMusicMoreVisible) {
        musicMoreContainer.classList.remove('hide');
        musicMoreButton.innerHTML = '<span>Less</span>';
    } else {
        musicMoreContainer.classList.add('hide');
        musicMoreButton.innerHTML = '<span>More</span><span>+</span>';
    }
});

// Event listeners for music platform buttons
document.querySelectorAll('#music-container .engine-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const musicId = this.dataset.music;
        musicSelect.value = musicId;
        updateMusic();
        
        // Focus on music search input
        musicInput.focus();
        
        // Double-click behavior
        if (this.getAttribute('data-last-click') && 
            (new Date().getTime() - parseInt(this.getAttribute('data-last-click')) < 300)) {
            if (musicInput.value.trim() !== '') {
                musicForm.submit();
            }
        }
        
        this.setAttribute('data-last-click', new Date().getTime());
    });
});

// Event listeners for music more platform buttons
document.querySelectorAll('#music-more-container .engine-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const musicId = this.dataset.music;
        musicSelect.value = musicId;
        updateMusic();
        
        // Focus on music search input
        musicInput.focus();
        
        // Double-click behavior
        if (this.getAttribute('data-last-click') && 
            (new Date().getTime() - parseInt(this.getAttribute('data-last-click')) < 300)) {
            if (musicInput.value.trim() !== '') {
                musicForm.submit();
            }
        }
        
        this.setAttribute('data-last-click', new Date().getTime());
    });
});

// Configure music form to add to history
musicForm.addEventListener('submit', function(event) {
    const query = musicInput.value.trim();
    const selectedMusic = musicSelect.value;
    const music = musicPlatforms[selectedMusic];
    if (query) {
        if (music && music.usesPath) {
            event.preventDefault();
            window.open(music.url + '/' + encodeURIComponent(query), '_blank');
            addToSearchHistory(query, selectedMusic);
        } else {
            addToSearchHistory(query, selectedMusic);
        }
    } else {
        event.preventDefault();
    }
});

// Add voice recognition for music
voiceMusicButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    try {
        if (isListening) {
            stopRecognition();
        } else {
            // Create and start a new instance
            recognition = createRecognition(voiceMusicButton, musicInput, musicForm);
            recognition.start();
        }
    } catch (error) {
        console.error('Speech recognition error:', error);
        stopRecognition();
    }
});

// Multi-selection for music platforms
let selectedMusic = new Set();
let multiMusicMode = false;
function updateMusicButtonSelection() {
    document.querySelectorAll('#music-container .engine-button, #music-more-container .engine-button').forEach(btn => {
        if (selectedMusic.has(btn.dataset.music)) {
            btn.classList.add('multi-selected');
        } else {
            btn.classList.remove('multi-selected');
        }
    });
}
document.querySelectorAll('#music-container .engine-button, #music-more-container .engine-button').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (e.ctrlKey || e.metaKey) {
            const music = this.dataset.music;
            if (selectedMusic.has(music)) {
                selectedMusic.delete(music);
            } else {
                selectedMusic.add(music);
            }
            updateMusicButtonSelection();
            multiMusicMode = selectedMusic.size > 1;
        } else {
            selectedMusic.clear();
            selectedMusic.add(this.dataset.music);
            updateMusicButtonSelection();
            multiMusicMode = false;
        }
    });
});
musicForm.addEventListener('submit', function(event) {
    if (multiMusicMode && selectedMusic.size > 1) {
        event.preventDefault();
        const query = musicInput.value.trim();
        if (!query) return;
        selectedMusic.forEach(musicId => {
            const music = musicPlatforms[musicId];
            if (music && music.usesPath) {
                window.open(music.url + '/' + encodeURIComponent(query), '_blank');
            } else if (music) {
                const url = new URL(music.url);
                url.searchParams.set(music.paramName, query);
                window.open(url.toString(), '_blank');
            }
        });
        selectedMusic.forEach(musicId => addToSearchHistory(query, musicId));
    }
});
musicInput.addEventListener('input', function() {
    if (!multiMusicMode) {
        selectedMusic.clear();
        updateMusicButtonSelection();
    }
});

// Initialize music form to SoundCloud by default when loading the page
document.addEventListener('DOMContentLoaded', function() {
    // Make the giant A7LAS title clickable to return home without touching visual effects
    try {
        const atlasTitle = document.querySelector('.title-container .title');
        if (atlasTitle) {
            atlasTitle.style.cursor = 'pointer';
            atlasTitle.setAttribute('title', 'Home');
            atlasTitle.addEventListener('click', function() {
                // Simple home navigation
                window.location.href = 'index.html';
            });
        }
    } catch (e) {
        console.warn('Title click binding skipped:', e);
    }
    // Initialize music form to use SoundCloud by default
    if (musicForm) {
        musicSelect.value = 'soundcloud';
        musicForm.action = 'https://soundcloud.com/search';
        musicInput.name = 'q';
        
        // Set SoundCloud button as active by default
        document.querySelectorAll('#music-container .engine-button').forEach(button => {
            if (button.dataset.music === 'soundcloud') {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
});

// Improved PWA Install Button Implementation

// Reference to the install button and toast
const installButton = document.getElementById('install-button');
const toast = document.getElementById('toast');
const appInstallBanner = document.getElementById('app-install-banner');
const appInstallAccept = document.getElementById('app-install-accept');
const appInstallDismiss = document.getElementById('app-install-dismiss');

// Variable to store the deferred prompt event
let deferredPrompt;

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    
    // Store the event so it can be triggered later
    deferredPrompt = e;
    
    // Make the install button visible now that we know installation is available
    if (installButton) {
        installButton.classList.add('visible');
        installButton.style.display = 'flex'; // Make sure it's visible
    }
    
    // For mobile devices, maybe show the banner
    if (isMobileDevice() && shouldShowInstallBanner()) {
        setTimeout(() => {
            if (appInstallBanner) {
                appInstallBanner.style.display = 'block';
            }
        }, 2000);
    }
    
    console.log('✅ beforeinstallprompt event was fired and stored');
});

// Installation button event listener with proper error handling
if (installButton) {
    installButton.addEventListener('click', async () => {
        console.log('📱 Install button clicked');
        
        // Check if we have the prompt event stored
        if (!deferredPrompt) {
            console.log('❌ No installation prompt available');
            showToast("Please use your browser's 'Add to Home Screen' feature to install A7LAS");
            return;
        }
        
        try {
            // Show the prompt
            deferredPrompt.prompt();
            console.log('🔔 Installation prompt displayed');
            
            // Wait for the user to respond to the prompt
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`✍️ User response to the install prompt: ${outcome}`);
            
            // We've used the prompt, and can't use it again, so clear it
            deferredPrompt = null;
            
            // Hide the install button regardless of outcome
            installButton.classList.remove('visible');
            
            if (outcome === 'accepted') {
                showToast("Thanks for installing A7LAS!");
                console.log('✅ PWA installation accepted');
            } else {
                console.log('❌ PWA installation dismissed');
            }
        } catch (error) {
            console.error('⚠️ Error during PWA installation:', error);
            showToast("Installation failed. Please try again or use your browser menu.");
        }
    });
}

// Handle installation in the app banner as well
if (appInstallAccept) {
    appInstallAccept.addEventListener('click', async () => {
        console.log('📱 Install banner accept button clicked');
        
        if (!deferredPrompt) {
            console.log('❌ No installation prompt available from banner');
            showToast("Please use your browser's 'Add to Home Screen' feature to install A7LAS");
            return;
        }
        
        try {
            // Show the prompt
            deferredPrompt.prompt();
            
            // Wait for user response
            const { outcome } = await deferredPrompt.userChoice;
            deferredPrompt = null;
            
            // Hide banner regardless of outcome
            if (appInstallBanner) {
                appInstallBanner.style.display = 'none';
            }
            
            if (outcome === 'accepted') {
                showToast("Thanks for installing A7LAS!");
            }
        } catch (error) {
            console.error('Error during banner PWA installation:', error);
            showToast("Installation failed. Please try again.");
        }
    });
}

// Listen for the appinstalled event
window.addEventListener('appinstalled', (e) => {
    console.log('🎉 A7LAS was installed', e);
    
    // Hide UI elements
    if (installButton) installButton.classList.remove('visible');
    if (appInstallBanner) appInstallBanner.style.display = 'none';
    
    // Save in preferences
    saveInstallBannerPreference(true);
    
    // Show confirmation
    showToast("A7LAS was successfully installed!");
});

// Check if already installed as PWA
if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('🏠 App is already installed and running as PWA');
    
    // Hide install UI
    if (installButton) installButton.style.display = 'none';
    if (appInstallBanner) appInstallBanner.style.display = 'none';
}

// Helper functions
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function shouldShowInstallBanner() {
    try {
        const dismissed = localStorage.getItem('a7las_install_banner_dismissed') === 'true';
        const timestamp = parseInt(localStorage.getItem('a7las_install_banner_timestamp') || '0');
        const now = Date.now();
        const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
        
        return !dismissed || (now - timestamp > threeDaysMs);
    } catch (e) {
        console.error('Error checking banner preferences:', e);
        return true;
    }
}

function saveInstallBannerPreference(dismissed) {
    try {
        localStorage.setItem('a7las_install_banner_dismissed', dismissed.toString());
        localStorage.setItem('a7las_install_banner_timestamp', Date.now().toString());
    } catch (e) {
        console.error('Error saving banner preferences:', e);
    }
}

function showToast(message) {
    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Debug function - you can call this from the console to verify PWA eligibility
window.debugPWA = function() {
    console.log('PWA Debug Info:');
    console.log('- Navigator serviceWorker supported:', 'serviceWorker' in navigator);
    console.log('- Running in standalone mode:', window.matchMedia('(display-mode: standalone)').matches);
    console.log('- Has stored install prompt:', deferredPrompt !== undefined);
    console.log('- Mobile device detected:', isMobileDevice());
    
    // Check if manifest is accessible (use relative path to support subfolder hosting)
    fetch('manifest.json')
        .then(response => {
            console.log('- Manifest accessible:', response.ok);
            return response.json();
        })
        .then(data => {
            console.log('- Manifest content valid:', !!data.name);
        })
        .catch(err => {
            console.log('- Manifest error:', err);
        });
    
    // Check service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations()
            .then(registrations => {
                console.log('- Service worker registrations:', registrations.length);
                registrations.forEach((reg, i) => {
                    console.log(`  Registration ${i+1}:`, reg.scope, 'State:', reg.active ? 'active' : 'inactive');
                });
            });
    }
};

// Mapping des moteurs de recherche (amélioré pour gérer différentes structures d'URL)
const searchEngines = {
    // Moteurs IA - avec URLs et paramètres corrects
    
    'mistral': { url: 'https://chat.mistral.ai/chat', paramName: 'q' },
    'grok': { url: 'https://grok.com/', paramName: 'q' },
    'perplexity': { url: 'https://www.perplexity.ai/search', paramName: 'q' },
    'you': { url: 'https://you.com/search', paramName: 'q' },
'phind': { url: 'https://www.phind.com/search', paramName: 'q' },
    'gemini': { url: 'https://gemini.google.com/app', paramName: 'text' },
    'copilot': { url: 'https://copilot.microsoft.com/', paramName: 'q' },
    'huggingchat': { url: 'https://huggingface.co/chat/', paramName: 'prompt' },
    'poe': { url: 'https://poe.com/', paramName: 'q' },
    'anthropic': { url: 'https://console.anthropic.com/chat', paramName: 'prompt' },
    'bard': { url: 'https://bard.google.com/', paramName: 'q' },
    'replicate': { url: 'https://replicate.com/explore', paramName: 'query' },
    
    // Moteurs de recherche généraux
    'google': { url: 'https://www.google.com/search', paramName: 'q' },
    'bing': { url: 'https://www.bing.com/search', paramName: 'q' },
    'duckduckgo': { url: 'https://duckduckgo.com/', paramName: 'q' },
    'yahoo': { url: 'https://search.yahoo.com/search', paramName: 'p' },
    'qwant': { url: 'https://www.qwant.com/', paramName: 'q' },
    'brave': { url: 'https://search.brave.com/search', paramName: 'q' },
    
    // Moteurs asiatiques
    'baidu': { url: 'https://www.baidu.com/s', paramName: 'wd' },
    'naver': { url: 'https://search.naver.com/search.naver', paramName: 'query' },
    'sogou': { url: 'https://www.sogou.com/web', paramName: 'query' },
    '360search': { url: 'https://www.so.com/s', paramName: 'q' },
    'coccoc': { url: 'https://coccoc.com/search', paramName: 'query' },
    'yahoojp': { url: 'https://search.yahoo.co.jp/search', paramName: 'p' },
    'daum': { url: 'https://search.daum.net/search', paramName: 'q' },
    'goo': { url: 'https://search.goo.ne.jp/web.jsp', paramName: 'MT' },
    'petal': { url: 'https://petalsearch.com/search', paramName: 'query' },
    'shenma': { url: 'https://m.sm.cn/s', paramName: 'q' },
    'yandex': { url: 'https://yandex.com/search/', paramName: 'text' },
    
    // Moteurs indépendants et alternatifs
    'ecosia': { url: 'https://www.ecosia.org/search', paramName: 'q' },
    'startpage': { url: 'https://www.startpage.com/search', paramName: 'query' },
    'mojeek': { url: 'https://www.mojeek.com/search', paramName: 'q' },
    'presearch': { url: 'https://presearch.com/search', paramName: 'q' },
    'swisscows': { url: 'https://swisscows.com/web', paramName: 'query' },
    'metager': { url: 'https://metager.org/meta/meta.ger3', paramName: 'eingabe' },
    'gigablast': { url: 'https://www.gigablast.com/search', paramName: 'q' },
    'kagi': { url: 'https://kagi.com/search', paramName: 'q' },
    'neeva': { url: 'https://neeva.com/search', paramName: 'q' },
    
    // Spécialisés
    'wolfram': { url: 'https://www.wolframalpha.com/input', paramName: 'i' },
    'deepl': { url: 'https://www.deepl.com/translator', paramName: 'text' }
};

// Fonction pour rediriger vers différentes plateformes IA
function redirectToAI(platform, query) {
    // Cas particuliers pour chaque plateforme IA
    switch(platform) {
       case 'GROK':
            // Perplexity utilise une structure d'URL spécifique
            window.open(`https://grok.com/chat?q=${encodeURIComponent(query)}`, '_blank');
            break;
      
        case 'perplexity':
            // Perplexity utilise une structure d'URL spécifique
            window.open(`https://www.perplexity.ai/search?q=${encodeURIComponent(query)}`, '_blank');
            break;
        case 'phind':
            // Phind utilise une structure d'URL spécifique
            window.open(`https://www.phind.com/search?q=${encodeURIComponent(query)}`, '_blank');
            break;
        case 'gemini':
            // Gemini utilise une structure d'URL spécifique
            window.open(`https://gemini.google.com/app?text=${encodeURIComponent(query)}`, '_blank');
            break;
        case 'mistral':
            // Mistral utilise une structure d'URL spécifique
            window.open(`https://chat.mistral.ai/chat?q=${encodeURIComponent(query)}`, '_blank');
            break;
        case 'you':
            // You.com utilise une structure d'URL spécifique
            window.open(`https://you.com/search?q=${encodeURIComponent(query)}`, '_blank');
            break;
        case 'copilot':
            // Microsoft Copilot utilise une structure d'URL spécifique
            window.open(`https://copilot.microsoft.com/?q=${encodeURIComponent(query)}`, '_blank');
            break;
        case 'huggingchat':
            // HuggingChat utilise une structure d'URL spécifique
            window.open(`https://huggingface.co/chat/?prompt=${encodeURIComponent(query)}`, '_blank');
            break;
        case 'poe':
            // Poe utilise une structure d'URL spécifique
            window.open(`https://poe.com/chat?q=${encodeURIComponent(query)}`, '_blank');
            break;
        case 'anthropic':
            // Anthropic Console utilise une structure d'URL spécifique
            window.open(`https://console.anthropic.com/chat?prompt=${encodeURIComponent(query)}`, '_blank');
            break;
        case 'bard':
            // Google Bard utilise une structure d'URL spécifique
            window.open(`https://bard.google.com/chat?q=${encodeURIComponent(query)}`, '_blank');
            break;
        case 'replicate':
            // Replicate utilise une structure d'URL spécifique
            window.open(`https://replicate.com/explore?query=${encodeURIComponent(query)}`, '_blank');
            break;
        default:
            // Pour les autres moteurs, utiliser la configuration standard
            const engine = searchEngines[platform];
            if (engine) {
                const url = new URL(engine.url);
                url.searchParams.set(engine.paramName, query);
                window.open(url.toString(), '_blank');
            }
    }
    
    // Ajouter à l'historique de recherche
    addToSearchHistory(query, platform);
    return false;
}


// Mapping for shopping platforms
// Note: Some platforms use the query in the URL path (usesPath).
// For those, we optionally support a suffix to append after the encoded query (usesPathSuffix).
const shoppingPlatforms = {
    // Global
    'amazon': { url: 'https://www.amazon.com/s', paramName: 'k' },
    'ebay': { url: 'https://www.ebay.com/sch/i.html', paramName: '_nkw' },
    'aliexpress': { url: 'https://www.aliexpress.com/wholesale', paramName: 'SearchText' },
    'etsy': { url: 'https://www.etsy.com/search', paramName: 'q' },

    // Europe
    // Zalando catalogue search
    'zalando': { url: 'https://www.zalando.fr/catalogue/', paramName: 'q' },
    // OTTO requires the term in the path: https://www.otto.de/suche/<term>/
    'otto': { url: 'https://www.otto.de/suche', usesPath: true },
    // Cdiscount prefers path-based search: https://www.cdiscount.com/search/10/<term>.html
    // Cdiscount: reliable query param endpoint
    'cdiscount': { url: 'https://www.cdiscount.com/search', paramName: 'q' },
    'fnac': { url: 'https://www.fnac.com/SearchResult/ResultList.aspx', paramName: 'Search' },
    'bolcom': { url: 'https://www.bol.com/nl/nl/s/', paramName: 'searchtext' },
    'allegro': { url: 'https://allegro.pl/listing', paramName: 'string' },
    'asos': { url: 'https://www.asos.com/search/', paramName: 'q' },
    // galerieslafayette removed
    'manomano': { url: 'https://www.manomano.fr/search/', paramName: 'query' },
    'vinted': { url: 'https://www.vinted.fr/catalog', paramName: 'search_text' },
    'aboutyou': { url: 'https://www.aboutyou.de/suche', paramName: 'term' },
    'mediamarkt': { url: 'https://www.mediamarkt.de/de/search.html', paramName: 'query' },
    // darty removed
    'carrefour': { url: 'https://www.carrefour.fr/s', paramName: 'q' },
    // boulanger removed (unstable client-side routing)
    'notino': { url: 'https://www.notino.fr/search.asp', paramName: 'exps' },
    'idealo': { url: 'https://www.idealo.de/preisvergleich/MainSearchProductCategory.html', paramName: 'q' }
};

// Mapping for archive platforms
const archivePlatforms = {
    'loc': { url: 'https://www.loc.gov/search', paramName: 'q' },
    'trove': { url: 'https://trove.nla.gov.au/search', paramName: 'q' },
    'hathitrust': { url: 'https://www.hathitrust.org/search', paramName: 'q' },
    'europepmc': { url: 'https://europepmc.org/search', paramName: 'query' },
    'jstor': { url: 'https://www.jstor.org/action/doBasicSearch', paramName: 'Query' },
    'openlibrary': { url: 'https://openlibrary.org/search', paramName: 'q' },
    'smithsonian': { url: 'https://collections.si.edu/search', paramName: 'q' },
    'digitalnz': { url: 'https://digitalnz.org/records', paramName: 'text' },
    'calisphere': { url: 'https://calisphere.org/search', paramName: 'q' },
    'worldcat': { url: 'https://www.worldcat.org/search', paramName: 'q' },
    'archive': { url: 'https://archive.org/search', paramName: 'query' }, // OK
    'europeana': { url: 'https://www.europeana.eu/en/search', paramName: 'query' }, // OK
    'ina': { url: 'https://www.ina.fr/recherche', paramName: 'q' }, // Corrigé structure correcte
    'britishpathe': { url: 'https://www.britishpathe.com/search/query', usesPath: true }, // Utilise le chemin URL
    'dpla': { url: 'https://dp.la/search', paramName: 'q' }, // OK
    'gallica': { url: 'https://gallica.bnf.fr/services/engine/search/sru', paramName: 'q' }, // OK
    'bfi': { url: 'https://player.bfi.org.uk/free/search', paramName: 'q' }, // OK
    'medici': { url: 'https://www.medici.tv/en/search/', paramName: 'q' }, // OK
    'artfilms': { url: 'https://www.artfilms-digital.com/search-results/', paramName: 'q' }, // Corrigé path
    'onf': { url: 'https://www.nfb.ca/search/', paramName: 'q' }, // OK
    'bnespana': { url: 'http://bdh.bne.es/bnesearch/Search.do', paramName: 'text' }, // OK mais pas idéal
    'dle': { url: 'https://www.europeana.eu/en/search', paramName: 'query' }, // OK (redirection)
    'filmoteca': { url: 'https://www.culturaydeporte.gob.es/cultura/areas/cine/mc/fe/fondos-filmicos/catalogos/buscador.html', paramName: 'query' }, // OK mais requiert POST
    'openimages': { url: 'https://openbeelden.nl/search', paramName: 'q' }, // OK
    'prelinger': { url: 'https://archive.org/details/prelinger', paramName: 'query' }, // Corrigé URL
    'kinopoisk': { url: 'https://www.kinopoisk.ru/s/type/film/list/1/find', usesPath: true }, // Utilise le chemin URL
    'eyefilm': { url: 'https://www.eyefilm.nl/en/search', paramName: 'search_api_fulltext' }, // OK
    'filmportal': { url: 'https://www.filmportal.de/suche', paramName: 'q' }, // Corrigé URL
    'mediathek': { url: 'https://www.ardmediathek.de/suche', paramName: 'q' }, // OK
    'gaumont': { 
        url: 'https://www.gaumontpathearchives.com/index.php', 
        paramName: 'keyword', 
        extraParams: { 'html': '4', 'form_search': '1' } 
    } // Structure complexe, ajout paramètres
};


// Référence aux éléments du DOM
const searchForm = document.getElementById('search-form');
const shoppingForm = document.getElementById('shopping-form');
const archiveForm = document.getElementById('archive-form');
const engineSelect = document.getElementById('engine-select');
const shoppingSelect = document.getElementById('shopping-select');
const archiveSelect = document.getElementById('archive-select');
const searchInput = document.getElementById('search-input');
const shoppingInput = document.getElementById('shopping-input');
const archiveInput = document.getElementById('archive-input');
const themeToggle = document.getElementById('theme-toggle');
const voiceButton = document.getElementById('voice-search-button');
const voiceShoppingButton = document.getElementById('voice-shopping-button');
const voiceArchiveButton = document.getElementById('voice-archive-button');
const voiceIndicator = document.getElementById('voice-indicator');

// Mode switching elements
const searchModeButton = document.getElementById('search-mode-button');
const shoppingModeButton = document.getElementById('shopping-mode-button');
const archiveModeButton = document.getElementById('archive-mode-button');
const enginesContainer = document.getElementById('engines-container');
const shoppingContainer = document.getElementById('shopping-container');
const archiveContainer = document.getElementById('archive-container');

// Show More/Add Service elements
const showMoreButton = document.getElementById('show-more-button');
const moreServicesContainer = document.getElementById('more-services-container');
const shoppingMoreButton = document.getElementById('shopping-more-button');
const shoppingMoreContainer = document.getElementById('shopping-more-container');
const shoppingMoreButtonContainer = document.getElementById('shopping-more-button-container');
const archiveMoreButton = document.getElementById('archive-more-button');
const archiveMoreContainer = document.getElementById('archive-more-container');
const archiveMoreButtonContainer = document.getElementById('archive-more-button-container');

// Add Service buttons for all modes
const addServiceButton = document.getElementById('add-service-button');
const shoppingAddServiceButton = document.getElementById('shopping-add-service-button');
const archiveAddServiceButton = document.getElementById('archive-add-service-button');
const addServiceContainer = document.querySelector('.add-service-container');
const shoppingAddServiceContainer = document.getElementById('shopping-add-service-container');
const archiveAddServiceContainer = document.getElementById('archive-add-service-container');

const addServiceForm = document.getElementById('add-service-form');
const cancelServiceButton = document.getElementById('cancel-service');
const saveServiceButton = document.getElementById('save-service');
const importExportSection = document.getElementById('import-export');
const exportButton = document.getElementById('export-button');
const importInput = document.getElementById('import-input');

// Search History elements
const searchHistoryItems = document.getElementById('search-history-items');
const clearHistoryButton = document.getElementById('clear-history');
const exportHistoryButton = document.getElementById('export-history');

// Modal elements
const aboutModal = document.getElementById('about-modal');
const legalModal = document.getElementById('legal-modal');
const faqModal = document.getElementById('faq-modal');
const aboutLink = document.getElementById('about-link');
const aboutLinkFooterMain = document.getElementById('about-link-footer-main');
const legalLink = document.getElementById('legal-link');
const faqLink = document.getElementById('faq-link');
const faqLinkFooterMain = document.getElementById('faq-link-footer-main');
const closeModalButtons = document.querySelectorAll('.close-modal');

// Variables for custom services and search history
let customServices = [];
let searchHistory = [];
let isMoreServicesVisible = false;
let isShoppingMoreVisible = false;
let isArchiveMoreVisible = false;

// Load custom services and search history from localStorage
function loadCustomServices() {
    try {
        const savedServices = localStorage.getItem('z1_custom_services');
        if (savedServices) {
            customServices = JSON.parse(savedServices);
            
            // Display custom services
            renderCustomServices();
            
            // Show import/export section if we have custom services
            if (customServices.length > 0) {
                importExportSection.style.display = 'flex';
            }
        }
    } catch (e) {
        console.error('Error loading custom services:', e);
    }
}

function loadSearchHistory() {
    try {
        const savedHistory = localStorage.getItem('z1_search_history');
        if (savedHistory) {
            searchHistory = JSON.parse(savedHistory);
            renderSearchHistory();
        }
    } catch (e) {
        console.error('Error loading search history:', e);
    }
}

// Render custom services
function renderCustomServices() {
    const customServicesContainer = document.getElementById('custom-services-container');
    customServicesContainer.innerHTML = '';
    
    customServices.forEach((service, index) => {
        const button = document.createElement('button');
        button.className = 'engine-button custom-service-button';
        button.setAttribute('data-custom-index', index);
        
        button.innerHTML = `
            ${service.name}
            <span class="directory-icon">⭐</span>
        `;
        
        button.addEventListener('click', function() {
            // Set this custom service as the active engine
            setActiveEngine(null, service);
            
            // Display toast
            showToast(`Using ${service.name} service`);
        });
        
        // Add double-click event to remove custom service
        button.addEventListener('dblclick', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (confirm(`Remove ${service.name} service?`)) {
                customServices.splice(index, 1);
                saveCustomServices();
                renderCustomServices();
                
                // Hide import/export if no custom services
                if (customServices.length === 0) {
                    importExportSection.style.display = 'none';
                }
                
                showToast(`${service.name} service removed`);
            }
        });
        
        customServicesContainer.appendChild(button);
    });
}


// Render search history
function renderSearchHistory() {
    searchHistoryItems.innerHTML = '';
    
    if (searchHistory.length === 0) {
        searchHistoryItems.innerHTML = `
            <div class="search-history-empty" style="text-align: center; color: #9ca3af; padding: 20px;">
                No search history yet. Your recent searches will appear here.
            </div>
        `;
        return;
    }
    
    // Affiche tout l'historique, pas seulement les 10 derniers
    searchHistory.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'search-history-item';
        
        // Format time (e.g., "2h", "5m", "now")
        const timeAgo = getTimeAgo(new Date(item.timestamp));
        
        historyItem.innerHTML = `
            <div class="search-history-item-content">
                <div class="search-history-item-text" title="${item.query}">${item.query}</div>
                <div class="search-history-item-engine">${getEngineIcon(item.engine)} ${getEngineName(item.engine)}</div>
            </div>
            <div class="search-history-item-actions">
                <span class="search-history-item-time" style="margin-top: 3px; margin-right: 5px;">${timeAgo}</span>
                <button class="search-history-item-action" data-action="search" data-index="${index}" title="Search again">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
                <button class="search-history-item-action" data-action="delete" data-index="${index}" title="Remove from history">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;
        
        // Add event listener for clicking on the search text
        const textEl = historyItem.querySelector('.search-history-item-text');
        textEl.addEventListener('click', function() {
            repeatSearch(item);
        });
        
        // Add event listeners for action buttons
        const actionButtons = historyItem.querySelectorAll('.search-history-item-action');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                const itemIndex = parseInt(this.getAttribute('data-index'));
                
                if (action === 'search') {
                    repeatSearch(searchHistory[itemIndex]);
                } else if (action === 'delete') {
                    searchHistory.splice(itemIndex, 1);
                    saveSearchHistory();
                    renderSearchHistory();
                    showToast('Search removed from history');
                }
            });
        });
        
        searchHistoryItems.appendChild(historyItem);
    });
}

// About and Legal links with modal functionality
if (aboutLink) {
    aboutLink.addEventListener('click', function(e) {
        e.preventDefault();
        aboutModal.classList.add('show');
    });
}

if (aboutLinkFooterMain) {
    aboutLinkFooterMain.addEventListener('click', function(e) {
        e.preventDefault();
        aboutModal.classList.add('show');
    });
}

if (faqLink) {
    faqLink.addEventListener('click', function(e) {
        e.preventDefault();
        faqModal.classList.add('show');
    });
}

if (faqLinkFooterMain) {
    faqLinkFooterMain.addEventListener('click', function(e) {
        e.preventDefault();
        faqModal.classList.add('show');
    });
}

legalLink.addEventListener('click', function(e) {
    e.preventDefault();
    legalModal.classList.add('show');
});

// FAQ Accordion functionality
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Close modal functionality
closeModalButtons.forEach(button => {
    button.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        document.getElementById(modalId).classList.remove('show');
    });
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === aboutModal) {
        aboutModal.classList.remove('show');
    }
    if (event.target === legalModal) {
        legalModal.classList.remove('show');
    }
    if (event.target === faqModal) {
        faqModal.classList.remove('show');
    }
});

// Close modal with escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        aboutModal.classList.remove('show');
        legalModal.classList.remove('show');
        faqModal.classList.remove('show');
    }
});

// Helper function to format time ago
function getTimeAgo(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffSec < 60) {
        return 'just';
    } else if (diffMin < 60) {
        return `${diffMin}m`;
    } else if (diffHour < 24) {
        return `${diffHour}h`;
    } else {
        return `${diffDay}d`;
    }
}

// Helper function to get engine name
function getEngineName(engine) {
    // Check for custom service
    if (engine.startsWith('custom:')) {
        const customId = engine.split(':')[1];
        const customService = customServices.find(s => s.id === customId);
        return customService ? customService.name : 'Custom Service';
    }
    
    // Map engine IDs to readable names
    const engineNames = {
        'gpt': 'ChatGPT',
        'grok': 'Grok',
        'perplexity': 'Perplexity',
        'google': 'Google',
        'bing': 'Bing',
        'yahoo': 'Yahoo',
        'duckduckgo': 'DuckDuckGo',
        'brave': 'Brave',
        'yandex': 'Yandex',
        'baidu': 'Baidu'
        // Add more as needed
    };
    
    return engineNames[engine] || engine.charAt(0).toUpperCase() + engine.slice(1);
}

// Helper function to get engine icon
function getEngineIcon(engine) {
    // Check for custom service
    if (engine.startsWith('custom:')) {
        return '⭐';
    }
    
    // Map engine IDs to icons
    const engineIcons = {
           'grok': '🐱',
        'mistral': '🐱',
        'gpt': '🤖',
        'grok': '🤖',
        'perplexity': '🔍',
        'google': '🇺🇸',
        'bing': '🇺🇸',
        'yahoo': '🇺🇸',
        'duckduckgo': '🇺🇸',
        'brave': '🇺🇸',
        'yandex': '🇷🇺',
        'baidu': '🇨🇳'
        // Add more as needed
    };
    
    return engineIcons[engine] || '';
}


// Repeat a search from history
function repeatSearch(historyItem) {
    // First check if it's a custom service
    if (historyItem.engine.startsWith('custom:')) {
        const customId = historyItem.engine.split(':')[1];
        const customService = customServices.find(s => s.id === customId);
        
        if (customService) {
            // Switch to search mode if needed
            if (!searchModeButton.classList.contains('active')) {
                searchModeButton.click();
            }
            
            // Set the query in the input field
            searchInput.value = historyItem.query;
            
            // Perform the search
            executeCustomSearch(customService, historyItem.query);
            return;
        }
    }
    
    // Handle regular engine search
    const engine = historyItem.engine;
    let mode = 'search';
    
    // Determine which mode we're in
    if (Object.keys(shoppingPlatforms).includes(engine)) {
        mode = 'shopping';
        if (!shoppingModeButton.classList.contains('active')) {
            shoppingModeButton.click();
        }
        shoppingSelect.value = engine;
        shoppingInput.value = historyItem.query;
        updateShopping();
        shoppingForm.submit();
    } else if (Object.keys(archivePlatforms).includes(engine)) {
        mode = 'archive';
        if (!archiveModeButton.classList.contains('active')) {
            archiveModeButton.click();
        }
        archiveSelect.value = engine;
        archiveInput.value = historyItem.query;
        updateArchive();
        archiveForm.submit();
    } else if (Object.keys(musicPlatforms).includes(engine)) {
        mode = 'music';
        if (!musicModeButton.classList.contains('active')) {
            musicModeButton.click();
        }
        musicSelect.value = engine;
        musicInput.value = historyItem.query;
        updateMusic();
        musicForm.submit();
    } else {
        // Default to search mode
        if (!searchModeButton.classList.contains('active')) {
            searchModeButton.click();
        }
        engineSelect.value = engine;
        searchInput.value = historyItem.query;
        updateSearchEngine();
        searchForm.submit();
    }
}

// Save custom services to localStorage
function saveCustomServices() {
    localStorage.setItem('z1_custom_services', JSON.stringify(customServices));
}

// Save search history to localStorage
function saveSearchHistory() {
    localStorage.setItem('z1_search_history', JSON.stringify(searchHistory));
}

// Add a search to history
function addToSearchHistory(query, engine, isCustomService = false) {
    // Don't add empty queries
    if (!query || query.trim() === '') return;
    
    // Prepare engine identifier
    let engineId = engine;
    if (isCustomService) {
        engineId = `custom:${engine.id}`;
    }
    
    // Add to the beginning of the array
    searchHistory.unshift({
        query: query,
        engine: engineId,
        timestamp: new Date().toISOString()
    });
    
    // Limit to 50 items
    if (searchHistory.length > 50) {
        searchHistory = searchHistory.slice(0, 50);
    }
    
    // Save and render
    saveSearchHistory();
    renderSearchHistory();
}

// Clear all search history
clearHistoryButton.addEventListener('click', function() {
    if (confirm('Clear all search history?')) {
        searchHistory = [];
        saveSearchHistory();
        renderSearchHistory();
        showToast('Search history cleared');
    }
});

// Export search history (disabled in history section; available in top nav backup)
if (exportHistoryButton) {
    exportHistoryButton.addEventListener('click', function() {
        if (searchHistory.length === 0) {
            showToast('No search history to export');
            return;
        }
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(searchHistory));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "z1_search_history.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        showToast('Search history exported successfully');
    });
}

// Import/Export for history section removed; use top-right Save/Import instead.

// Mode switching functionality
searchModeButton.addEventListener('click', function() {
    // Switch to search mode
    searchModeButton.classList.add('active');
    shoppingModeButton.classList.remove('active');
    archiveModeButton.classList.remove('active');
    musicModeButton.classList.remove('active');
    searchForm.classList.remove('hide');
    shoppingForm.classList.add('hide');
    archiveForm.classList.add('hide');
    enginesContainer.classList.remove('hide');
    shoppingContainer.classList.add('hide');
    archiveContainer.classList.add('hide');
    
    // Show/hide add service buttons
    addServiceContainer.style.display = 'flex';
    shoppingAddServiceContainer.style.display = 'none';
    archiveAddServiceContainer.style.display = 'none';
    
    // Show more services buttons
    showMoreButton.parentElement.style.display = 'flex';
    shoppingMoreButtonContainer.style.display = 'none';
    archiveMoreButtonContainer.style.display = 'none';
    
    // Reset more services visibility
    if (!isMoreServicesVisible) {
        moreServicesContainer.classList.add('hide');
        showMoreButton.innerHTML = '<span>More</span><span>+</span>';
    } else {
        moreServicesContainer.classList.remove('hide');
        showMoreButton.innerHTML = '<span>Less</span>';
    }
    
    // Hide other more services containers
    shoppingMoreContainer.classList.add('hide');
    archiveMoreContainer.classList.add('hide');
    
    // Masquer tous les éléments du mode music
    musicForm.classList.add('hide');
    musicContainer.classList.add('hide');
    musicMoreButtonContainer.style.display = 'none';
    musicAddServiceContainer.style.display = 'none';
    isMusicMoreVisible = false;
    musicMoreContainer.classList.add('hide');
    
    // Focus on search input
    setTimeout(() => {
        searchInput.focus();
    }, 10);
});

shoppingModeButton.addEventListener('click', function() {
    // Switch to shopping platforms mode
    searchModeButton.classList.remove('active');
    shoppingModeButton.classList.add('active');
    archiveModeButton.classList.remove('active');
    musicModeButton.classList.remove('active');
    searchForm.classList.add('hide');
    shoppingForm.classList.remove('hide');
    archiveForm.classList.add('hide');
    enginesContainer.classList.add('hide');
    shoppingContainer.classList.remove('hide');
    archiveContainer.classList.add('hide');
    
    // Show/hide add service buttons
    addServiceContainer.style.display = 'none';
    shoppingAddServiceContainer.style.display = 'flex';
    archiveAddServiceContainer.style.display = 'none';
    
    // Show more services buttons
    showMoreButton.parentElement.style.display = 'none';
    shoppingMoreButtonContainer.style.display = 'flex';
    archiveMoreButtonContainer.style.display = 'none';
    
    // Reset more services visibility
    if (!isShoppingMoreVisible) {
        shoppingMoreContainer.classList.add('hide');
        shoppingMoreButton.innerHTML = '<span>More</span><span>+</span>';
    } else {
        shoppingMoreContainer.classList.remove('hide');
        shoppingMoreButton.innerHTML = '<span>Less</span>';
    }
    
    // Hide other more services containers
    moreServicesContainer.classList.add('hide');
    archiveMoreContainer.classList.add('hide');
    
    // Masquer tous les éléments du mode music
    musicForm.classList.add('hide');
    musicContainer.classList.add('hide');
    musicMoreButtonContainer.style.display = 'none';
    musicAddServiceContainer.style.display = 'none';
    isMusicMoreVisible = false;
    musicMoreContainer.classList.add('hide');
    
    // Focus on shopping input
    setTimeout(() => {
        shoppingInput.focus();
    }, 10);
});

archiveModeButton.addEventListener('click', function() {
    // Switch to archive platforms mode
    searchModeButton.classList.remove('active');
    shoppingModeButton.classList.remove('active');
    archiveModeButton.classList.add('active');
    musicModeButton.classList.remove('active');
    searchForm.classList.add('hide');
    shoppingForm.classList.add('hide');
    archiveForm.classList.remove('hide');
    enginesContainer.classList.add('hide');
    shoppingContainer.classList.add('hide');
    archiveContainer.classList.remove('hide');
    
    // Show/hide add service buttons
    addServiceContainer.style.display = 'none';
    shoppingAddServiceContainer.style.display = 'none';
    archiveAddServiceContainer.style.display = 'flex';
    
    // Show more services buttons
    showMoreButton.parentElement.style.display = 'none';
    shoppingMoreButtonContainer.style.display = 'none';
    archiveMoreButtonContainer.style.display = 'flex';
    
    // Reset more services visibility
    if (!isArchiveMoreVisible) {
        archiveMoreContainer.classList.add('hide');
        archiveMoreButton.innerHTML = '<span>More</span><span>+</span>';
    } else {
        archiveMoreContainer.classList.remove('hide');
        archiveMoreButton.innerHTML = '<span>Less</span>';
    }
    
    // Hide other more services containers
    moreServicesContainer.classList.add('hide');
    shoppingMoreContainer.classList.add('hide');
    
    // Masquer tous les éléments du mode music
    musicForm.classList.add('hide');
    musicContainer.classList.add('hide');
    musicMoreButtonContainer.style.display = 'none';
    musicAddServiceContainer.style.display = 'none';
    isMusicMoreVisible = false;
    musicMoreContainer.classList.add('hide');
    
    // Focus on archive input
    setTimeout(() => {
        archiveInput.focus();
    }, 10);
});

// Show More/Less button functionality for Search
showMoreButton.addEventListener('click', function() {
    isMoreServicesVisible = !isMoreServicesVisible;
    
    if (isMoreServicesVisible) {
        moreServicesContainer.classList.remove('hide');
        showMoreButton.innerHTML = '<span>Less</span>';
    } else {
        moreServicesContainer.classList.add('hide');
        showMoreButton.innerHTML = '<span>More</span><span>+</span>';
    }
});

// Show More/Less button functionality for Shopping
shoppingMoreButton.addEventListener('click', function() {
    isShoppingMoreVisible = !isShoppingMoreVisible;
    
    if (isShoppingMoreVisible) {
        shoppingMoreContainer.classList.remove('hide');
        shoppingMoreButton.innerHTML = '<span>Less</span>';
    } else {
        shoppingMoreContainer.classList.add('hide');
        shoppingMoreButton.innerHTML = '<span>More</span><span>+</span>';
    }
});

// Show More/Less button functionality for Archive
archiveMoreButton.addEventListener('click', function() {
    isArchiveMoreVisible = !isArchiveMoreVisible;
    
    if (isArchiveMoreVisible) {
        archiveMoreContainer.classList.remove('hide');
        archiveMoreButton.innerHTML = '<span>Less</span>';
    } else {
        archiveMoreContainer.classList.add('hide');
        archiveMoreButton.innerHTML = '<span>More</span><span>+</span>';
    }
});


// Add Custom Service functionality
function showAddServiceForm() {
    addServiceForm.classList.add('show');
}

addServiceButton.addEventListener('click', showAddServiceForm);
shoppingAddServiceButton.addEventListener('click', showAddServiceForm);
archiveAddServiceButton.addEventListener('click', showAddServiceForm);

cancelServiceButton.addEventListener('click', function() {
    addServiceForm.classList.remove('show');
    // Reset form fields
    document.getElementById('service-name').value = '';
    document.getElementById('service-url').value = '';
    document.getElementById('service-param').value = '';
});

// Mise à jour du moteur de recherche
function updateSearchEngine() {
    const selectedEngine = engineSelect.value;
    const engine = searchEngines[selectedEngine];
    
    if (engine) {
        searchForm.action = engine.url;
        searchInput.name = engine.paramName;
        
        // Mise à jour des boutons actifs
        document.querySelectorAll('#engines-container .engine-button:not([data-custom-index])').forEach(button => {
            if (button.dataset.engine === selectedEngine) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        document.querySelectorAll('#more-services-container .engine-button').forEach(button => {
            if (button.dataset.engine === selectedEngine) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        // Désactiver toute sélection épinglée lorsqu'on change de moteur standard
        document.querySelectorAll('.pinned-favorite').forEach(btn => btn.classList.remove('active'));
    }
    
    // Ajouter un focus sur le champ de recherche
    setTimeout(() => {
        searchInput.focus();
    }, 10);
}

// Mise à jour de la plateforme de shopping
function updateShopping() {
    const selectedShopping = shoppingSelect.value;
    const shopping = shoppingPlatforms[selectedShopping];
    
    if (shopping) {
        // Handle path-based or standard query-based search endpoints
        if (shopping.usesPath) {
            // For path-based, action points to base URL, input has no name
            shoppingForm.action = shopping.url;
            shoppingInput.name = '';
            // Custom submit handler to open with query in path
            shoppingForm.onsubmit = function(event) {
                const term = shoppingInput.value.trim();
                if (!term) {
                    event.preventDefault();
                    return false;
                }
                event.preventDefault();
                let target = shopping.url + '/' + encodeURIComponent(term);
                if (shopping.usesPathSuffix) {
                    target += shopping.usesPathSuffix;
                } else {
                    // Some sites require a trailing slash (e.g., OTTO)
                    if (!target.endsWith('/')) target += '/';
                }
                window.open(target, '_blank');
                addToSearchHistory(term, selectedShopping);
                return false;
            };
        } else {
            // Standard case: query as a GET parameter
            shoppingForm.action = shopping.url;
            shoppingInput.name = shopping.paramName;
            shoppingForm.onsubmit = function(event) {
                const term = shoppingInput.value.trim();
                if (term) {
                    addToSearchHistory(term, selectedShopping);
                } else {
                    event.preventDefault();
                }
            };
        }
        
        // Mise à jour des boutons actifs
        document.querySelectorAll('#shopping-container .engine-button').forEach(button => {
            if (button.dataset.shopping === selectedShopping) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        document.querySelectorAll('#shopping-more-container .engine-button').forEach(button => {
            if (button.dataset.shopping === selectedShopping) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    // Ajouter un focus sur le champ de recherche de shopping
    setTimeout(() => {
        shoppingInput.focus();
    }, 10);
}

// Mise à jour de la plateforme d'archives
function updateArchive() {
    const selectedArchive = archiveSelect.value;
    const archive = archivePlatforms[selectedArchive];
    
    if (archive) {
        // Gestion des cas spéciaux
        if (archive.usesPath) {
            // British Pathé ou Kinopoisk utilisent le terme dans le chemin URL
            archiveForm.onsubmit = function(event) {
                event.preventDefault();
                const term = archiveInput.value.trim();
                if (term) {
                    window.open(archive.url + '/' + encodeURIComponent(term), '_blank');
                    
                    // Add to search history
                    addToSearchHistory(term, selectedArchive);
                }
                return false;
            };
        } 
        else if (archive.extraParams) {
            // Gaumont a des paramètres additionnels
            const baseUrl = new URL(archive.url);
            Object.entries(archive.extraParams).forEach(([key, value]) => {
                baseUrl.searchParams.set(key, value);
            });
            
            archiveForm.action = baseUrl.toString();
            archiveInput.name = archive.paramName;
            archiveForm.onsubmit = function(event) {
                const term = archiveInput.value.trim();
                if (term) {
                    // Add to search history
                    addToSearchHistory(term, selectedArchive);
                } else {
                    event.preventDefault();
                }
            };
        }
        else {
            // Cas standard - configuration normale
            archiveForm.action = archive.url;
            archiveInput.name = archive.paramName;
            archiveForm.onsubmit = function(event) {
                const term = archiveInput.value.trim();
                if (term) {
                    // Add to search history
                    addToSearchHistory(term, selectedArchive);
                } else {
                    event.preventDefault();
                }
            };
        }
        
        // Mise à jour des boutons actifs
        document.querySelectorAll('#archive-container .engine-button').forEach(button => {
            if (button.dataset.archive === selectedArchive) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        document.querySelectorAll('#archive-more-container .engine-button').forEach(button => {
            if (button.dataset.archive === selectedArchive) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    // Ajouter un focus sur le champ de recherche d'archives
    setTimeout(() => {
        archiveInput.focus();
    }, 10);
}

// Set active engine (could be a standard engine or custom service)
function setActiveEngine(engineId, customService = null) {
    if (customService) {
        // Custom service case
        searchForm.action = customService.url;
        searchInput.name = customService.paramName;
        
        // Update UI - remove active class from all standard engines
        document.querySelectorAll('#engines-container .engine-button:not([data-custom-index])').forEach(button => {
            button.classList.remove('active');
        });
        
        document.querySelectorAll('#more-services-container .engine-button').forEach(button => {
            button.classList.remove('active');
        });

        // Remove active from pinned favorites
        document.querySelectorAll('.pinned-favorite').forEach(button => {
            button.classList.remove('active');
        });
        
        // Add active class to custom button
        document.querySelectorAll(`[data-custom-index]`).forEach(button => {
            const index = parseInt(button.dataset.customIndex);
            if (customServices[index].id === customService.id) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        // Focus on search field
        setTimeout(() => {
            searchInput.focus();
        }, 10);
    } else if (engineId) {
        // Standard engine case
        engineSelect.value = engineId;
        updateSearchEngine();
    }
}


// Voice recognition and event handling for buttons
document.addEventListener('DOMContentLoaded', function() {
    // Ajout des gestionnaires d'événements pour les boutons de moteur
    // Moteurs de recherche dans le conteneur principal
    document.querySelectorAll('#engines-container .engine-button:not([data-custom-index])').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Empêche le comportement par défaut
            const engineId = this.dataset.engine;
            engineSelect.value = engineId;
            updateSearchEngine();
            
            // Focus sur le champ de recherche
            searchInput.focus();
            
            // Ne soumettre que si le bouton est explicitement double-cliqué
            if (this.getAttribute('data-last-click') && 
                (new Date().getTime() - parseInt(this.getAttribute('data-last-click')) < 300)) {
                if (searchInput.value.trim() !== '') {
                    searchForm.submit();
                }
            }
            
            this.setAttribute('data-last-click', new Date().getTime());
        });
    });
    
    // Moteurs de recherche dans le conteneur "more services"
    document.querySelectorAll('#more-services-container .engine-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const engineId = this.dataset.engine;
            engineSelect.value = engineId;
            updateSearchEngine();
            
            // Focus sur le champ de recherche
            searchInput.focus();
            
            // Double-click behavior
            if (this.getAttribute('data-last-click') && 
                (new Date().getTime() - parseInt(this.getAttribute('data-last-click')) < 300)) {
                if (searchInput.value.trim() !== '') {
                    searchForm.submit();
                }
            }
            
            this.setAttribute('data-last-click', new Date().getTime());
        });
    });
    
    // Boutons de shopping dans le conteneur principal
    document.querySelectorAll('#shopping-container .engine-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const shoppingId = this.dataset.shopping;
            shoppingSelect.value = shoppingId;
            updateShopping();
            
            // Focus sur le champ de recherche de shopping
            shoppingInput.focus();
            
            // Double-click behavior
            if (this.getAttribute('data-last-click') && 
                (new Date().getTime() - parseInt(this.getAttribute('data-last-click')) < 300)) {
                if (shoppingInput.value.trim() !== '') {
                    shoppingForm.submit();
                }
            }
            
            this.setAttribute('data-last-click', new Date().getTime());
        });
    });
    
    // Boutons de shopping dans le conteneur "more services"
    document.querySelectorAll('#shopping-more-container .engine-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const shoppingId = this.dataset.shopping;
            shoppingSelect.value = shoppingId;
            updateShopping();
            
            // Focus sur le champ de recherche de shopping
            shoppingInput.focus();
            
            // Double-click behavior
            if (this.getAttribute('data-last-click') && 
                (new Date().getTime() - parseInt(this.getAttribute('data-last-click')) < 300)) {
                if (shoppingInput.value.trim() !== '') {
                    shoppingForm.submit();
                }
            }
            
            this.setAttribute('data-last-click', new Date().getTime());
        });
    });
    
    // Boutons d'archives dans le conteneur principal
    document.querySelectorAll('#archive-container .engine-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const archiveId = this.dataset.archive;
            archiveSelect.value = archiveId;
            updateArchive();
            
            // Focus sur le champ de recherche d'archives
            archiveInput.focus();
            
            // Double-click behavior
            if (this.getAttribute('data-last-click') && 
                (new Date().getTime() - parseInt(this.getAttribute('data-last-click')) < 300)) {
                if (archiveInput.value.trim() !== '') {
                    archiveForm.submit();
                }
            }
            
            this.setAttribute('data-last-click', new Date().getTime());
        });
    });
    
    // Boutons d'archives dans le conteneur "more services"
    document.querySelectorAll('#archive-more-container .engine-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const archiveId = this.dataset.archive;
            archiveSelect.value = archiveId;
            updateArchive();
            
            // Focus sur le champ de recherche d'archives
            archiveInput.focus();
            
            // Double-click behavior
            if (this.getAttribute('data-last-click') && 
                (new Date().getTime() - parseInt(this.getAttribute('data-last-click')) < 300)) {
                if (archiveInput.value.trim() !== '') {
                    archiveForm.submit();
                }
            }
            
            this.setAttribute('data-last-click', new Date().getTime());
        });
    });


    // Vérifier la prise en charge de la reconnaissance vocale
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        // Si non prise en charge, masquer les boutons de voix
        if (voiceButton) voiceButton.style.display = 'none';
        if (voiceShoppingButton) voiceShoppingButton.style.display = 'none';
        if (voiceArchiveButton) voiceArchiveButton.style.display = 'none';
        if (voiceMusicButton) voiceMusicButton.style.display = 'none';
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    let isListening = false;
    let recognitionTimeout = null;
    let maxListeningTime = 8000; // 8 secondes maximum d'écoute
    let currentInputField = null; // Référence au champ d'entrée actif
    
    // Fonction pour arrêter la reconnaissance et réinitialiser l'interface
    function stopRecognition() {
        if (recognition) {
            try {
                recognition.stop();
            } catch (e) {
                console.error("Error stopping recognition:", e);
            }
        }
        
        // Réinitialiser l'interface quelle que soit l'issue de recognition.stop()
        isListening = false;
        
        // Remove listening class from all voice buttons
        if (voiceButton) voiceButton.classList.remove('listening');
        if (voiceShoppingButton) voiceShoppingButton.classList.remove('listening');
        if (voiceArchiveButton) voiceArchiveButton.classList.remove('listening');
        if (voiceMusicButton) voiceMusicButton.classList.remove('listening');
        
        // Hide voice indicator
        if (voiceIndicator) voiceIndicator.classList.remove('show');
        
        // Annuler tout timeout
        if (recognitionTimeout) {
            clearTimeout(recognitionTimeout);
            recognitionTimeout = null;
        }
    }
    
    // Fonction pour créer une nouvelle instance de reconnaissance vocale
    function createRecognition(targetButton, inputField, formToSubmit) {
        // Arrêter toute reconnaissance en cours
        stopRecognition();
        currentInputField = inputField;
        recognition = new SpeechRecognition();
        // Configuration pour mobile
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;
        recognition.lang = navigator.language || 'en-US';
        // Gestionnaires d'événements
        recognition.onstart = function() {
            console.log('Speech recognition started');
            isListening = true;
            targetButton.classList.add('listening');
            voiceIndicator.classList.add('show');
            
            // Définir un timeout de sécurité
            recognitionTimeout = setTimeout(function() {
                console.log('Forced timeout after ' + maxListeningTime + 'ms');
                stopRecognition();
            }, maxListeningTime);
        };
        
        recognition.onresult = function(event) {
            // Obtenir le dernier résultat
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
            
            console.log('Transcript:', transcript);
            
            // Mettre à jour le champ d'entrée
            if (currentInputField) {
                currentInputField.value = transcript;
            }
            
            // Si c'est un résultat final, arrêter la reconnaissance
            if (event.results[0].isFinal) {
                // Détection de "CLOWN" (insensible à la casse et espaces)
                if (transcript.replace(/\s+/g, '').toLowerCase().includes('clown')) {
                    // Déclencher la soumission du formulaire correspondant
                    if (formToSubmit && typeof formToSubmit.submit === 'function') {
                        setTimeout(function() {
                            formToSubmit.submit();
                        }, 300); // petit délai pour UX
                    }
                }
                setTimeout(function() {
                    stopRecognition();
                }, 800);
            }
        };
        
        recognition.onend = function() {
            console.log('Speech recognition ended normally');
            stopRecognition();
        };
        
        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            stopRecognition();
            
            // Message d'erreur
            let errorMessage = "Microphone error. Please check permissions.";
            if (event.error === 'not-allowed') {
                errorMessage = "Microphone access denied. Please allow microphone use.";
            }
            
            showToast(errorMessage);
        };
        
        return recognition;
    }
    
    // Gestionnaire d'événements pour le bouton de microphone de recherche
    voiceButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        try {
            if (isListening) {
                stopRecognition();
            } else {
                // Créer et démarrer une nouvelle instance
                recognition = createRecognition(voiceButton, searchInput, searchForm);
                recognition.start();
            }
        } catch (error) {
            console.error('Speech recognition error:', error);
            stopRecognition();
        }
    });
    
    // Gestionnaire d'événements pour le bouton de microphone de shopping
    voiceShoppingButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        try {
            if (isListening) {
                stopRecognition();
            } else {
                // Créer et démarrer une nouvelle instance
                recognition = createRecognition(voiceShoppingButton, shoppingInput, shoppingForm);
                recognition.start();
            }
        } catch (error) {
            console.error('Speech recognition error:', error);
            stopRecognition();
        }
    });
    
    // Gestionnaire d'événements pour le bouton de microphone d'archive
    voiceArchiveButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        try {
            if (isListening) {
                stopRecognition();
            } else {
                // Créer et démarrer une nouvelle instance
                recognition = createRecognition(voiceArchiveButton, archiveInput, archiveForm);
                recognition.start();
            }
        } catch (error) {
            console.error('Speech recognition error:', error);
            stopRecognition();
        }
    });


    // Support pour raccourci clavier
    document.addEventListener('keydown', function(event) {
        if (event.altKey && (event.key === 'm' || event.key === 'v')) {
            event.preventDefault();
            
            try {
                if (isListening) {
                    stopRecognition();
                } else {
                    // Utiliser le bon champ d'entrée selon le mode actif
                    if (!searchForm.classList.contains('hide')) {
                        recognition = createRecognition(voiceButton, searchInput, searchForm);
                    } else if (!shoppingForm.classList.contains('hide')) {
                        recognition = createRecognition(voiceButton, searchInput, searchForm);
                    } else if (!shoppingForm.classList.contains('hide')) {
                        recognition = createRecognition(voiceShoppingButton, shoppingInput, shoppingForm);
                    } else if (!musicForm.classList.contains('hide')) {
                        recognition = createRecognition(voiceMusicButton, musicInput, musicForm);
                    } else {
                        recognition = createRecognition(voiceArchiveButton, archiveInput, archiveForm);
                    }
                    recognition.start();
                }
            } catch (error) {
                console.error('Speech recognition keyboard shortcut error:', error);
                stopRecognition();
            }
        }
    });
    
    // Configure search forms to add to history with AI redirection
    searchForm.addEventListener('submit', function(event) {
        const query = searchInput.value.trim();
        const selectedEngine = engineSelect.value;
        
        if (!query) {
            event.preventDefault();
            return;
        }
        
        // Check if a pinned favorite is active - if so, let the form submit normally
        const activePinned = document.querySelector('.pinned-favorite.active');
        if (activePinned) {
            // Let form submit with configured action/method for pinned link
            const pinnedId = activePinned.getAttribute('data-pinned-id');
            const pinnedFav = favorites.find(f => f.id === parseInt(pinnedId));
            if (pinnedFav) {
                addToSearchHistory(query, `pinned:${pinnedFav.name}`);
            }
            return; // Let default form submission happen
        }
        
        // Ajout de freedomgpt et gtpsearch comme IA nécessitant un traitement spécial
        const aiEngines = ['gpt', 'claude', 'perplexity', 'phind', 'gemini', 'mistral', 'grok', 'you', 'copilot', 'huggingchat', 'poe', 'anthropic', 'bard', 'replicate'];
        
        if (multiSelectMode && selectedEngines.size > 1) {
            // Multi-sélection - ouvrir dans plusieurs onglets et créer une entrée d'historique pour chaque moteur
            event.preventDefault();
            selectedEngines.forEach(engineId => {
                // Vérifier si c'est un moteur IA
                if (aiEngines.includes(engineId)) {
                    redirectToAI(engineId, query);
                } else {
                    const engine = searchEngines[engineId];
                    if (engine) {
                        const url = new URL(engine.url);
                        url.searchParams.set(engine.paramName, query);
                        window.open(url.toString(), '_blank');
                    }
                    // Ajouter à l'historique pour moteur non-IA
                    addToSearchHistory(query, engineId);
                }
            });
        } else if (aiEngines.includes(selectedEngine)) {
            event.preventDefault();
            redirectToAI(selectedEngine, query);
        } else {
            // Cas standard - moteur unique non-IA
            addToSearchHistory(query, selectedEngine);
        }
    });
    
    // Generic history handler for shopping form.
    // Skip here if a specialized onsubmit (usesPath/extra) is handling it to avoid duplicates.
    shoppingForm.addEventListener('submit', function(event) {
        const query = shoppingInput.value.trim();
        const selected = shoppingSelect.value;
        const cfg = shoppingPlatforms[selected];
        if (!query) {
            event.preventDefault();
            return;
        }
        if (cfg && (cfg.usesPath || cfg.extraParams)) {
            // Handled by custom onsubmit in updateShopping
            return;
        }
        addToSearchHistory(query, selected);
    });
    
    archiveForm.addEventListener('submit', function(event) {
        const query = archiveInput.value.trim();
        if (query) {
            addToSearchHistory(query, archiveSelect.value);
        } else {
            event.preventDefault();
        }
    });
    
    // Forcer la réinitialisation au démarrage de la page
    window.addEventListener('pageshow', function() {
        stopRecognition();
    });
    
    // S'assurer que tout est réinitialisé lors du chargement de la page
    window.addEventListener('load', function() {
        stopRecognition();
    });


    // === Custom Background (Fond d'écran personnalisé) ===
    const bgPlusToggle = document.getElementById('bg-plus-toggle');
    const bgModal = document.getElementById('bg-modal');
    const bgUrlInput = document.getElementById('bg-url-input');
    const bgFileInput = document.getElementById('bg-file-input');
    const bgApplyBtn = document.getElementById('bg-apply-btn');
    const bgClearBtn = document.getElementById('bg-clear-btn');
    const customBgLayer = document.getElementById('custom-bg-layer');

    function setCustomBg(bg) {
        if (bg) {
            customBgLayer.style.backgroundImage = `url('${bg}')`;
            document.body.classList.remove('no-bg');
        } else {
            customBgLayer.style.backgroundImage = 'none';
            document.body.classList.add('no-bg');
        }
    }

    function saveCustomBg(bg) {
        if (bg) {
            localStorage.setItem('z1_custom_bg', bg);
        } else {
            localStorage.removeItem('z1_custom_bg');
        }
    }

    function loadCustomBg() {
        const bg = localStorage.getItem('z1_custom_bg');
        setCustomBg(bg);
    }

    // Ouvre le modal
    bgPlusToggle.addEventListener('click', function() {
        bgModal.classList.add('show');
    });
    // Ferme le modal
    bgModal.querySelector('.close-modal').addEventListener('click', function() {
        bgModal.classList.remove('show');
    });
    // Appliquer le fond
    bgApplyBtn.addEventListener('click', function() {
        let bg = bgUrlInput.value.trim();
        if (!bg && bgFileInput.files && bgFileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                setCustomBg(e.target.result);
                saveCustomBg(e.target.result);
                bgModal.classList.remove('show');
                bgUrlInput.value = '';
                bgFileInput.value = '';
            };
            reader.readAsDataURL(bgFileInput.files[0]);
            return;
        }
        if (bg) {
            setCustomBg(bg);
            saveCustomBg(bg);
            bgModal.classList.remove('show');
            bgUrlInput.value = '';
            bgFileInput.value = '';
        }
    });
    // Effacer le fond
    bgClearBtn.addEventListener('click', function() {
        setCustomBg(null);
        saveCustomBg(null);
        bgModal.classList.remove('show');
        bgUrlInput.value = '';
        bgFileInput.value = '';
    });
    // Fermer le modal si clic dehors
    window.addEventListener('click', function(event) {
        if (event.target === bgModal) {
            bgModal.classList.remove('show');
        }
    });
    // Charger le fond au démarrage
    loadCustomBg();

    // === Sélection multiple moteurs & ouverture multi-onglets ===
    let selectedEngines = new Set();
    let multiSelectMode = false;

    function updateEngineButtonSelection() {
        document.querySelectorAll('#engines-container .engine-button, #more-services-container .engine-button').forEach(btn => {
            if (selectedEngines.has(btn.dataset.engine)) {
                btn.classList.add('multi-selected');
            } else {
                btn.classList.remove('multi-selected');
            }
        });
    }

    // Ajoute la classe CSS pour la sélection multiple
    const style = document.createElement('style');
    style.innerHTML = `.engine-button.multi-selected { outline: 2px solid #3b82f6; background: #1e293b; color: #fff; }`;
    document.head.appendChild(style);

    // Gestion du clic sur les boutons moteurs (multi-sélection)
    document.querySelectorAll('#engines-container .engine-button, #more-services-container .engine-button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (e.ctrlKey || e.metaKey) {
                // Multi-sélection
                const engine = this.dataset.engine;
                if (selectedEngines.has(engine)) {
                    selectedEngines.delete(engine);
                } else {
                    selectedEngines.add(engine);
                }
                updateEngineButtonSelection();
                multiSelectMode = selectedEngines.size > 1;
            } else {
                // Sélection simple
                selectedEngines.clear();
                selectedEngines.add(this.dataset.engine);
                updateEngineButtonSelection();
                multiSelectMode = false;
            }
        });
    });

    // Reset la sélection simple après recherche
    searchInput.addEventListener('input', function() {
        if (!multiSelectMode) {
            selectedEngines.clear();
            updateEngineButtonSelection();
        }
    });

    // === Sélection multiple SHOP & ARCHIVE ===
    let selectedShops = new Set();
    let multiShopMode = false;
    function updateShopButtonSelection() {
        document.querySelectorAll('#shopping-container .engine-button, #shopping-more-container .engine-button').forEach(btn => {
            if (selectedShops.has(btn.dataset.shopping)) {
                btn.classList.add('multi-selected');
            } else {
                btn.classList.remove('multi-selected');
            }
        });
    }
    document.querySelectorAll('#shopping-container .engine-button, #shopping-more-container .engine-button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (e.ctrlKey || e.metaKey) {
                const shop = this.dataset.shopping;
                if (selectedShops.has(shop)) {
                    selectedShops.delete(shop);
                } else {
                    selectedShops.add(shop);
                }
                updateShopButtonSelection();
                multiShopMode = selectedShops.size > 1;
            } else {
                selectedShops.clear();
                selectedShops.add(this.dataset.shopping);
                updateShopButtonSelection();
                multiShopMode = false;
            }
        });
    });
    shoppingForm.addEventListener('submit', function(event) {
        if (multiShopMode && selectedShops.size > 1) {
            event.preventDefault();
            const query = shoppingInput.value.trim();
            if (!query) return;
            selectedShops.forEach(shopId => {
                const shop = shoppingPlatforms[shopId];
                if (shop) {
                    const url = new URL(shop.url);
                    url.searchParams.set(shop.paramName, query);
                    window.open(url.toString(), '_blank');
                }
            });
            selectedShops.forEach(shopId => addToSearchHistory(query, shopId));
        }
    });
    shoppingInput.addEventListener('input', function() {
        if (!multiShopMode) {
            selectedShops.clear();
            updateShopButtonSelection();
        }
    });

    let selectedArchives = new Set();
    let multiArchiveMode = false;
    function updateArchiveButtonSelection() {
        document.querySelectorAll('#archive-container .engine-button, #archive-more-container .engine-button').forEach(btn => {
            if (selectedArchives.has(btn.dataset.archive)) {
                btn.classList.add('multi-selected');
            } else {
                btn.classList.remove('multi-selected');
            }
        });
    }
    document.querySelectorAll('#archive-container .engine-button, #archive-more-container .engine-button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (e.ctrlKey || e.metaKey) {
                const arch = this.dataset.archive;
                if (selectedArchives.has(arch)) {
                    selectedArchives.delete(arch);
                } else {
                    selectedArchives.add(arch);
                }
                updateArchiveButtonSelection();
                multiArchiveMode = selectedArchives.size > 1;
            } else {
                selectedArchives.clear();
                selectedArchives.add(this.dataset.archive);
                updateArchiveButtonSelection();
                multiArchiveMode = false;
            }
        });
    });
    archiveForm.addEventListener('submit', function(event) {
        if (multiArchiveMode && selectedArchives.size > 1) {
            event.preventDefault();
            const query = archiveInput.value.trim();
            if (!query) return;
            selectedArchives.forEach(archId => {
                const arch = archivePlatforms[archId];
                if (arch) {
                    if (arch.usesPath) {
                        window.open(arch.url + '/' + encodeURIComponent(query), '_blank');
                    } else {
                        const url = new URL(arch.url);
                        url.searchParams.set(arch.paramName, query);
                        if (arch.extraParams) {
                            Object.entries(arch.extraParams).forEach(([k, v]) => url.searchParams.set(k, v));
                        }
                        window.open(url.toString(), '_blank');
                    }
                }
            });
            selectedArchives.forEach(archId => addToSearchHistory(query, archId));
        }
    });
    archiveInput.addEventListener('input', function() {
        if (!multiArchiveMode) {
            selectedArchives.clear();
            updateArchiveButtonSelection();
        }
    });

    // Homepage modal functionality
    const homepageModal = document.getElementById('homepage-modal');
    const startHomepageLink = document.getElementById('start-homepage-link');
    const homepageLaterBtn = document.getElementById('homepage-later-btn');
    const homepageCopyUrlBtn = document.getElementById('homepage-copy-url-btn');
    const browserInstructionsContainer = document.getElementById('browser-instructions-container');
    
    // Event listener for the "Start with A7LAS" link
    if (startHomepageLink) {
        startHomepageLink.addEventListener('click', function(e) {
            e.preventDefault();
            showHomepageModal();
        });
    }
    
    // Close modal when clicking the "Later" button
    if (homepageLaterBtn) {
        homepageModal.classList.remove('show');
    }
    
    // Copy URL button functionality
    if (homepageCopyUrlBtn) {
        homepageCopyUrlBtn.addEventListener('click', function() {
            const currentUrl = window.location.href;
            navigator.clipboard.writeText(currentUrl)
                .then(() => {
                    showToast('URL copied to clipboard');
                })
                .catch(err => {
                    showToast('Could not copy URL');
                    console.error('Failed to copy URL: ', err);
                });
        });
    }
    
    // Function to show the homepage modal with browser-specific instructions
    function showHomepageModal() {
        // Detect browser
        const userAgent = navigator.userAgent.toLowerCase();
        const isChrome = /chrome/.test(userAgent) && !/edge|edg/.test(userAgent);
        const isFirefox = /firefox/.test(userAgent);
        const isEdge = /edge|edg/.test(userAgent);
        const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
        
        // Generate browser-specific instructions
        let browserInstructions = '';
        
        if (isChrome) {
            browserInstructions = `
                <div class="browser-instructions">
                    <h4>Chrome:</h4>
                    <ol>
                        <li>Click on ⋮ (menu) > Settings</li>
                        <li>Under "On startup", choose "Open a specific page"</li>
                        <li>Add <strong>${window.location.href}</strong></li>
                    </ol>
                </div>
            `;
        } else if (isFirefox) {
            browserInstructions = `
                <div class="browser-instructions">
                    <h4>Firefox:</h4>
                    <ol>
                        <li>Click on ☰ (menu) > Settings</li>
                        <li>In the Home tab, set homepage</li>
                        <li>Enter <strong>${window.location.href}</strong></li>
                    </ol>
                </div>
            `;
        } else if (isEdge) {
            browserInstructions = `
                <div class="browser-instructions">
                    <h4>Edge:</h4>
                    <ol>
                        <li>Click on ... (menu) > Settings</li>
                        <li>Under "On startup", choose "Open a specific page"</li>
                        <li>Add <strong>${window.location.href}</strong></li>
                    </ol>
                </div>
            `;
        } else if (isSafari) {
            browserInstructions = `
                <div class="browser-instructions">
                    <h4>Safari:</h4>
                    <ol>
                        <li>Safari > Preferences > General</li>
                        <li>For "Homepage", enter <strong>${window.location.href}</strong></li>
                        <li>Check "Homepage" for new windows/tabs</li>
                    </ol>
                </div>
            `;
        } else {
            browserInstructions = `
                <div class="browser-instructions">
                    <h4>Set as homepage:</h4>
                    <ol>
                        <li>Access your browser settings</li>
                        <li>Look for "Homepage" or "On startup" option</li>
                        <li>Enter <strong>${window.location.href}</strong></li>
                    </ol>
                </div>
            `;
        }
        
        // Update the container with the browser instructions
        browserInstructionsContainer.innerHTML = browserInstructions;
        
        // Show the modal
        homepageModal.classList.add('show');
    }
});

// Gestion du thème clair/sombre
// (Supprimé car la gestion du thème est centralisée dans initializeThemeDetector)

// Import/Export functionality
exportButton.addEventListener('click', function() {
    if (customServices.length === 0) {
        showToast('No custom services to export');
        return;
    }
    
    // Create a file to download
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(customServices));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "z1_custom_services.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    showToast('Custom services exported successfully');
});

importInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedServices = JSON.parse(e.target.result);
            
            if (Array.isArray(importedServices) && importedServices.length > 0) {
                // Merge with existing services, avoiding duplicates by name
                const existingNames = customServices.map(s => s.name.toLowerCase());
                
                let newServicesCount = 0;
                importedServices.forEach(service => {
                    if (!existingNames.includes(service.name.toLowerCase())) {
                        customServices.push(service);
                        newServicesCount++;
                    }
                });
                
                // Save and render
                saveCustomServices();
                renderCustomServices();
                
                // Show import/export section
                importExportSection.style.display = 'flex';
                
                showToast(`Imported ${newServicesCount} new services`);
            } else {
                showToast('No valid services found in the file');
            }
        } catch (error) {
            console.error('Error importing services:', error);
            showToast('Invalid file format');
        }
        
        // Reset file input
        importInput.value = '';
    };
    
    reader.readAsText(file);
});

// Initialize everything needed on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize search engine modes
    updateSearchEngine();
    updateShopping();
    updateArchive();
    
    // Load custom services and search history
    loadCustomServices();
    loadSearchHistory();
    
    // Load theme preference
    const savedTheme = localStorage.getItem('z1_theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.textContent = '☆';
    }
    
    // Show/hide relevant buttons according to active mode
    if (searchModeButton.classList.contains('active')) {
        addServiceContainer.style.display = 'flex';
        shoppingAddServiceContainer.style.display = 'none';
        archiveAddServiceContainer.style.display = 'none';
        showMoreButton.parentElement.style.display = 'flex';
        shoppingMoreButtonContainer.style.display = 'none';
        archiveMoreButtonContainer.style.display = 'none';
    } else if (shoppingModeButton.classList.contains('active')) {
        addServiceContainer.style.display = 'none';
        shoppingAddServiceContainer.style.display = 'flex';
        archiveAddServiceContainer.style.display = 'none';
        showMoreButton.parentElement.style.display = 'none';
        shoppingMoreButtonContainer.style.display = 'flex';
        archiveMoreButtonContainer.style.display = 'none';
    } else if (archiveModeButton.classList.contains('active')) {
        addServiceContainer.style.display = 'none';
        shoppingAddServiceContainer.style.display = 'none';
        archiveAddServiceContainer.style.display = 'flex';
        showMoreButton.parentElement.style.display = 'none';
        shoppingMoreButtonContainer.style.display = 'none';
        archiveMoreButtonContainer.style.display = 'flex';
    }
});

// Show toast message helper function
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}


// Fonction pour détecter et appliquer le mode automatiquement
function initializeThemeDetector() {
    // Vérifier si l'utilisateur a déjà fait un choix manuel
    const savedTheme = localStorage.getItem('z1_theme');
    
    // Créer un media query pour détecter la préférence système
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Conserver l'ancien comportement du toggle original
    const originalToggleHandler = themeToggle.onclick;
    themeToggle.onclick = null; // Supprimer temporairement pour éviter les doubles événements
    
    // Si aucun thème n'est déjà enregistré, initialiser avec la préférence système
    if (!savedTheme) {
      if (prefersDarkScheme.matches) {
        document.body.classList.remove('light-mode');
        themeToggle.textContent = '★';
      } else {
        document.body.classList.add('light-mode');
        themeToggle.textContent = '☆';
      }
      
      // Sauvegarder cette préférence initiale
      localStorage.setItem('z1_theme', prefersDarkScheme.matches ? 'dark' : 'light');
    }
    
    // Restaurer le comportement original du bouton de thème
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('light-mode');
      themeToggle.textContent = document.body.classList.contains('light-mode') ? '☆' : '★';
      
      // Save theme preference
      localStorage.setItem('z1_theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });
    
    // Ajouter un petit indicateur près du bouton (optionnel)
    const themeContainer = themeToggle.parentElement;
    const systemThemeIndicator = document.createElement('span');
    systemThemeIndicator.className = 'system-theme-indicator';
    systemThemeIndicator.style.fontSize = '0px';
    systemThemeIndicator.style.marginLeft = '0px';
    systemThemeIndicator.style.opacity = '0.7';
    systemThemeIndicator.style.cursor = 'pointer';
    systemThemeIndicator.textContent = '';
    systemThemeIndicator.title = 'Use system theme';
    
    // Cacher l'indicateur si le thème actuel est déjà le même que la préférence système
    const isSystemTheme = (prefersDarkScheme.matches && savedTheme === 'dark') || 
                          (!prefersDarkScheme.matches && savedTheme === 'light');
    systemThemeIndicator.style.display = isSystemTheme ? 'none' : 'inline';
    
    // Ajouter un événement pour rétablir le thème système
    systemThemeIndicator.addEventListener('click', function(e) {
      e.stopPropagation();
      
      // Appliquer le thème système
      if (prefersDarkScheme.matches) {
        document.body.classList.remove('light-mode');
        themeToggle.textContent = '★';
      } else {
        document.body.classList.add('light-mode');
        themeToggle.textContent = '☆';
      }
      
      // Sauvegarder cette préférence
      localStorage.setItem('z1_theme', prefersDarkScheme.matches ? 'dark' : 'light');
      
      // Cacher l'indicateur
      systemThemeIndicator.style.display = 'none';
      
      // Afficher un toast de confirmation
      if (typeof showToast === 'function') {
        showToast('System theme applied');
      }
    });
    
    // Ajouter l'indicateur au conteneur
    themeContainer.appendChild(systemThemeIndicator);
    
    // Mettre à jour l'indicateur quand la préférence système change
    prefersDarkScheme.addEventListener('change', function(e) {
      const currentTheme = localStorage.getItem('z1_theme');
      const isNowSystem = (e.matches && currentTheme === 'dark') || 
                          (!e.matches && currentTheme === 'light');
      
      systemThemeIndicator.style.display = isNowSystem ? 'none' : 'inline';
    });
  }
  
  // Appeler la fonction d'initialisation après le chargement du DOM
  document.addEventListener('DOMContentLoaded', function() {
    // Nous initialisons après le chargement du DOM et un petit délai
    // pour s'assurer que les autres scripts ont déjà chargé
    setTimeout(initializeThemeDetector, 100);
  });

// === CLEAR BUTTON (CROIX) LOGIC FOR ALL INPUTS ===
function setupClearButton(inputId, buttonId) {
    const input = document.getElementById(inputId);
    const button = document.getElementById(buttonId);
    if (!input || !button) return;

    // Show/hide croix on input
    input.addEventListener('input', function() {
        if (input.value.length > 0) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });

    // Clear input on croix click
    button.addEventListener('click', function(e) {
        e.preventDefault();
        input.value = '';
        button.style.display = 'none';
        input.focus();
        // Optionally, trigger input event for other listeners
        input.dispatchEvent(new Event('input'));
    });

    // On page load, set initial state
    if (input.value.length > 0) {
        button.style.display = 'flex';
    } else {
        button.style.display = 'none';
    }
}

// Setup for all modes
setupClearButton('search-input', 'clear-search-input');
setupClearButton('shopping-input', 'clear-shopping-input');
setupClearButton('archive-input', 'clear-archive-input');
setupClearButton('music-input', 'clear-music-input');

// Liste des moteurs IA connus
const aiEnginesSet = new Set([
 'grok', 'gpt','claude','perplexity','phind','gemini','mistral','grok','you','copilot','huggingchat','poe','anthropic','bard','replicate'
]);

function addAISuffixToEngineButtons() {
  // Pour chaque bouton moteur dans les deux conteneurs
  document.querySelectorAll('#engines-container .engine-button, #more-services-container .engine-button').forEach(btn => {
    const engine = btn.dataset.engine;
    if (aiEnginesSet.has(engine)) {
      // Cherche la pastille (span.directory-icon)
      const icon = btn.querySelector('.directory-icon');
      if (icon && !icon.querySelector('.ai-suffix')) {
        // Ajoute le suffixe AI en petit
        const ai = document.createElement('span');
        ai.textContent = 'AI';
        ai.className = 'ai-suffix';
        ai.style.fontSize = '9px';
        ai.style.marginLeft = '2px';
        ai.style.opacity = '0.7';
        ai.style.fontWeight = 'bold';
        icon.appendChild(ai);
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // ...existing code...
  setTimeout(initializeThemeDetector, 100);
  // Ajoute le suffixe AI après le rendu des boutons moteurs
  setTimeout(addAISuffixToEngineButtons, 200);
});

// ==============================
// Favorites Drawer + Backup Flow
// ==============================
(function() {
    // Storage keys
    const FAV_KEY = 'z1_favorites_v1';
    const FOLDER_KEY = 'z1_fav_folders_v1';

    // State
    let favorites = [];
    let favoriteFolders = [];
    let selectedFolder = 'All';

    // Elements (lazy resolved in DOMContentLoaded)
    let drawer, overlay, toggleBtn, closeBtn;
    let searchInput, favNameInput, favUrlInput, folderSelect, newFolderInput, addFolderBtn, addFavBtn;
    let folderFilterSelect, favSortSelect, filterAtlasOnly = false, filterPinnedOnly = false;
    let foldersContainer, listContainer;
    let backupModal, backupSaveBtn, backupImportBtn, backupImportInput, backupDownloadBtn, backupCopyBtn, backupEmailBtn, backupFilenameInput, backupEmailInput;
    
    // SVG icons for toggle button
    let favOriginalSVG, favCloseSVG;

    // Utilities
    function genId() {
        return 'fav_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    }

    function normalizeUrl(url) {
        try {
            // If no scheme, assume https
            if (!/^https?:\/\//i.test(url)) {
                url = 'https://' + url;
            }
            const u = new URL(url);
            return u.toString();
        } catch (e) {
            return url; // leave as-is; might still be valid-ish for custom schemes
        }
    }

    // Persistence
    function loadFavorites() {
        try {
            const raw = localStorage.getItem(FAV_KEY);
            favorites = raw ? JSON.parse(raw) : [];
        } catch { favorites = []; }
        try {
            const rawFolders = localStorage.getItem(FOLDER_KEY);
            favoriteFolders = rawFolders ? JSON.parse(rawFolders) : [];
        } catch { favoriteFolders = []; }
        // Ensure no duplicate folders and strip empties
        favoriteFolders = Array.from(new Set(favoriteFolders.map(f => (f || '').trim()))).filter(Boolean);
    }

    function saveFavorites() {
        try { localStorage.setItem(FAV_KEY, JSON.stringify(favorites)); } catch {}
    }
    function saveFolders() {
        try { localStorage.setItem(FOLDER_KEY, JSON.stringify(favoriteFolders)); } catch {}
    }

    // Rendering
    function renderFolderSelect() {
        if (!folderSelect) return;
        const current = folderSelect.value;
        folderSelect.innerHTML = '';
        // Show existing folders; if none, show a default
        const folders = favoriteFolders.length ? favoriteFolders : ['General'];
        folders.forEach(name => {
            const opt = document.createElement('option');
            opt.value = name;
            opt.textContent = name;
            folderSelect.appendChild(opt);
        });
        if (current && folders.includes(current)) folderSelect.value = current;
    }

    function syncFolderSelectToSelected(){
        if (!folderSelect) return;
        const folders = favoriteFolders.length ? favoriteFolders : ['General'];
        // Prefer selected folder if not 'All', else fallback to first folder
        const desired = (selectedFolder && selectedFolder !== 'All') ? selectedFolder : folders[0];
        if (folders.includes(desired)) folderSelect.value = desired;
    }

    function renderFolderFilter() {
        if (!folderFilterSelect) return;
        const current = selectedFolder || 'All';
        folderFilterSelect.innerHTML = '';
        const allOpt = document.createElement('option');
        allOpt.value = 'All';
        allOpt.textContent = 'All folders';
        folderFilterSelect.appendChild(allOpt);
        const folders = favoriteFolders.length ? favoriteFolders : ['General'];
        folders.forEach(name => {
            const opt = document.createElement('option');
            opt.value = name;
            opt.textContent = name;
            folderFilterSelect.appendChild(opt);
        });
        folderFilterSelect.value = current;
    }

    function renderFoldersUI() {
        if (!foldersContainer) return;
        foldersContainer.innerHTML = '';
        // Build counts
        const counts = favorites.reduce((acc, f) => {
            const folder = f.folder || 'General';
            acc[folder] = (acc[folder] || 0) + 1;
            acc['All'] = (acc['All'] || 0) + 1;
            return acc;
        }, { All: 0 });

    const allItem = document.createElement('div');
        allItem.className = 'folder-item' + (selectedFolder === 'All' ? ' active' : '');
        allItem.innerHTML = `<span>All</span><span>${counts['All'] || 0}</span>`;
    allItem.addEventListener('click', () => { selectedFolder = 'All'; if (folderFilterSelect) folderFilterSelect.value = 'All'; renderFoldersUI(); renderFavoritesList(); syncFolderSelectToSelected(); });
        foldersContainer.appendChild(allItem);

        const folders = favoriteFolders.slice();
        folders.forEach(name => {
            const el = document.createElement('div');
            el.className = 'folder-item' + (selectedFolder === name ? ' active' : '');
            el.innerHTML = `<span>${name}</span><span>${counts[name] || 0}</span>`;
            el.addEventListener('click', () => { selectedFolder = name; if (folderFilterSelect) folderFilterSelect.value = name; renderFoldersUI(); renderFavoritesList(); syncFolderSelectToSelected(); });
            foldersContainer.appendChild(el);
        });
    }

    function renderFavoritesList() {
        if (!listContainer) return;
        listContainer.innerHTML = '';
    const q = (searchInput?.value || '').toLowerCase().trim();
        
        // Sort favorites: isAtlas first, then pinned, then others
        let working = [...favorites];
        // Sorting
        if (favSortSelect && favSortSelect.value === 'name') {
            working.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        } else {
            working.sort((a, b) => {
                if (a.isAtlas && !b.isAtlas) return -1;
                if (!a.isAtlas && b.isAtlas) return 1;
                if (a.pinnedToSearch && !b.pinnedToSearch) return -1;
                if (!a.pinnedToSearch && b.pinnedToSearch) return 1;
                return (a.name || '').localeCompare(b.name || '');
            });
        }
        
        working
            .filter(item => selectedFolder === 'All' || (item.folder || 'General') === selectedFolder)
            .filter(item => !filterAtlasOnly || !!item.isAtlas)
            .filter(item => !filterPinnedOnly || !!item.pinnedToSearch)
            .filter(item => !q || item.name.toLowerCase().includes(q) || item.url.toLowerCase().includes(q))
            .forEach(item => {
                const row = document.createElement('div');
                row.className = 'favorite-row';
                
                // Build badges
                let badges = '';
                if (item.isAtlas) badges += '<span class="fav-badge atlas-badge">⭐ Atlas</span>';
                if (item.pinnedToSearch) badges += '<span class="fav-badge pinned-badge">📌 Pinned</span>';
                
                row.innerHTML = `
                    <div class="meta">
                        <div class="name" title="${item.name}">${item.name} ${badges}</div>
                        <div class="url" title="${item.url}">${item.url}</div>
                        <div class="fav-checkboxes">
                            <label class="fav-checkbox-label">
                                <input type="checkbox" class="atlas-checkbox" data-id="${item.id}" ${item.isAtlas ? 'checked' : ''} />
                                <span>Atlas Favorite</span>
                            </label>
                            <label class="fav-checkbox-label">
                                <input type="checkbox" class="pin-checkbox" data-id="${item.id}" ${item.pinnedToSearch ? 'checked' : ''} />
                                <span>Pin to Search</span>
                            </label>
                        </div>
                    </div>
                    <div class="actions">
                        <button class="open-btn" data-id="${item.id}">Open</button>
                        <select class="move-select" data-id="${item.id}"></select>
                        <button class="del-btn" data-id="${item.id}">Delete</button>
                    </div>
                `;

                // Populate move select
                const moveSelect = row.querySelector('.move-select');
                const currentFolder = item.folder || 'General';
                
                // Add placeholder option
                const placeholderOpt = document.createElement('option');
                placeholderOpt.value = '';
                placeholderOpt.textContent = 'Move to...';
                placeholderOpt.disabled = true;
                placeholderOpt.selected = true;
                moveSelect.appendChild(placeholderOpt);
                
                // Add current folder as first option
                const currentOpt = document.createElement('option');
                currentOpt.value = currentFolder;
                currentOpt.textContent = `📁 ${currentFolder} (current)`;
                moveSelect.appendChild(currentOpt);
                
                // Add other folders
                const folders = favoriteFolders.length ? favoriteFolders : ['General'];
                folders.forEach(name => {
                    if (name !== currentFolder) {
                        const opt = document.createElement('option');
                        opt.value = name;
                        opt.textContent = `📁 ${name}`;
                        moveSelect.appendChild(opt);
                    }
                });

                // Events
                row.querySelector('.open-btn').addEventListener('click', () => {
                    window.open(item.url, '_blank');
                });
                row.querySelector('.del-btn').addEventListener('click', () => {
                    favorites = favorites.filter(f => f.id !== item.id);
                    saveFavorites();
                    renderFoldersUI();
                    renderFavoritesList();
                    renderPinnedLinks();
                    if (typeof showToast === 'function') showToast('Favorite removed');
                });
                moveSelect.addEventListener('change', (e) => {
                    const newFolder = e.target.value;
                    if (!newFolder) return; // Ignore placeholder
                    const it = favorites.find(f => f.id === item.id);
                    if (it) {
                        it.folder = newFolder;
                        saveFavorites();
                        renderFoldersUI();
                        renderFavoritesList();
                        if (typeof showToast === 'function') showToast(`Moved to ${newFolder}`);
                    }
                });
                
                // Atlas checkbox
                row.querySelector('.atlas-checkbox').addEventListener('change', (e) => {
                    const it = favorites.find(f => f.id === item.id);
                    if (it) {
                        it.isAtlas = e.target.checked;
                        saveFavorites();
                        renderFavoritesList();
                        renderPinnedLinks();
                        if (typeof showToast === 'function') showToast(e.target.checked ? 'Set as Atlas Favorite' : 'Removed from Atlas Favorites');
                    }
                });
                
                // Pin to search checkbox
                row.querySelector('.pin-checkbox').addEventListener('change', (e) => {
                    const it = favorites.find(f => f.id === item.id);
                    if (it) {
                        it.pinnedToSearch = e.target.checked;
                        saveFavorites();
                        renderFavoritesList();
                        renderPinnedLinks();
                        if (typeof showToast === 'function') showToast(e.target.checked ? 'Pinned to search interface' : 'Unpinned from search');
                    }
                });

                listContainer.appendChild(row);
            });
    }

    // Adjust overlay bounds to header/footer heights
    function adjustFavLayout(){
        if (!drawer) return;
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        const top = header ? header.offsetHeight : 56;
        const bottom = footer ? footer.offsetHeight : 44;
        drawer.style.top = top + 'px';
        drawer.style.bottom = bottom + 'px';
        if (overlay) {
            overlay.style.top = top + 'px';
            overlay.style.bottom = bottom + 'px';
        }
    }

    // Expose UI helpers early (wrappers bound after definitions)
    window.A7LAS_UI = window.A7LAS_UI || {};

    // Drawer controls
    function openDrawer() {
        if (!drawer || !overlay) return;
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
        overlay.classList.add('show');
        overlay.setAttribute('aria-hidden', 'false');
        if (toggleBtn) {
            toggleBtn.classList.add('active');
            toggleBtn.setAttribute('aria-expanded','true');
            // Replace SVG with close icon
            const svg = toggleBtn.querySelector('svg');
            if (svg && favCloseSVG) svg.replaceWith(favCloseSVG.cloneNode(true));
        }
        adjustFavLayout();
        syncFolderSelectToSelected();
    }
    function closeDrawer() {
        if (!drawer || !overlay) return;
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        overlay.classList.remove('show');
        overlay.setAttribute('aria-hidden', 'true');
        if (toggleBtn) {
            toggleBtn.classList.remove('active');
            toggleBtn.setAttribute('aria-expanded','false');
            // Restore original SVG
            const svg = toggleBtn.querySelector('svg');
            if (svg && favOriginalSVG) svg.replaceWith(favOriginalSVG.cloneNode(true));
        }
    }

    // Bind UI helpers now that functions exist
    window.A7LAS_UI.openFavorites = openDrawer;
    window.A7LAS_UI.closeFavorites = closeDrawer;
    window.A7LAS_UI.isFavoritesOpen = () => !!(drawer && drawer.classList.contains('open'));
    if (!window.A7LAS_UI.closeAllExcept) {
        window.A7LAS_UI.closeAllExcept = function(name){
            try {
                if (name !== 'radio' && typeof window.A7LAS_UI.closeRadio === 'function') window.A7LAS_UI.closeRadio();
                if (name !== 'rss' && typeof window.A7LAS_UI.closeRSS === 'function') window.A7LAS_UI.closeRSS();
                if (name !== 'favorites' && typeof window.A7LAS_UI.closeFavorites === 'function') window.A7LAS_UI.closeFavorites();
            } catch(_) {}
        };
    }

    // Render pinned links in search interface
    function renderPinnedLinks() {
        // Render for all modes: search, shopping, archive, music
        const containers = [
            document.getElementById('pinned-links-container'),
            document.getElementById('pinned-links-shopping'),
            document.getElementById('pinned-links-archive'),
            document.getElementById('pinned-links-music')
        ];
        
        // Get pinned favorites sorted by: Atlas first, then others
        const pinnedLinks = favorites
            .filter(f => f.pinnedToSearch)
            .sort((a, b) => {
                if (a.isAtlas && !b.isAtlas) return -1;
                if (!a.isAtlas && b.isAtlas) return 1;
                return 0;
            });
        
        containers.forEach(container => {
            if (!container) return;
            
            // Clear container
            container.innerHTML = '';
            
            if (pinnedLinks.length === 0) {
                return;
            }
            
            pinnedLinks.forEach(link => {
                // Create button with same style as engine buttons
                const btn = document.createElement('button');
                btn.className = 'engine-button pinned-favorite';
                if (link.isAtlas) btn.classList.add('atlas-favorite');
                btn.setAttribute('data-pinned-id', String(link.id));
                
                // Just the name, no emoji like Mistral button
                btn.textContent = link.name;
                
                btn.addEventListener('click', (e) => {
                    e.preventDefault();

                    // Always switch to Search mode for pinned engines
                    if (typeof searchModeButton !== 'undefined' && !searchModeButton.classList.contains('active')) {
                        searchModeButton.click();
                    }

                    // Configure search form to use pinned link like an engine
                    searchForm.action = link.url;
                    searchInput.name = 'q'; // default param name for pinned personal engines

                    // Update active states: clear others, activate this pinned
                    document.querySelectorAll('#engines-container .engine-button').forEach(b => b.classList.remove('active'));
                    document.querySelectorAll('#more-services-container .engine-button').forEach(b => b.classList.remove('active'));
                    document.querySelectorAll('[data-custom-index]').forEach(b => b.classList.remove('active'));
                    document.querySelectorAll('.pinned-favorite').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    // Focus input and allow double-click to submit (same behavior as engines)
                    if (searchInput) searchInput.focus();
                    if (btn.getAttribute('data-last-click') && (new Date().getTime() - parseInt(btn.getAttribute('data-last-click')) < 300)) {
                        if (searchInput && searchInput.value.trim() !== '') {
                            searchForm.submit();
                        }
                    }
                    btn.setAttribute('data-last-click', String(new Date().getTime()));
                });
                
                container.appendChild(btn);
            });
        });
    }

    // Backup build/restore
    function buildBackup() {
        return {
            version: 1,
            exportedAt: new Date().toISOString(),
            favorites,
            favoriteFolders,
            searchHistory,
            // RSS backup is provided by the RSS module if present
            rssFeeds: (window.A7LAS_RSS && typeof window.A7LAS_RSS.getBackup === 'function') ? (window.A7LAS_RSS.getBackup().rssFeeds || []) : [],
            rssState: (window.A7LAS_RSS && typeof window.A7LAS_RSS.getBackup === 'function') ? (window.A7LAS_RSS.getBackup().rssState || null) : null
        };
    }

    function restoreBackup(obj) {
        if (!obj || typeof obj !== 'object') return false;
        let changed = false;
        if (Array.isArray(obj.favorites)) { favorites = obj.favorites; saveFavorites(); changed = true; }
        if (Array.isArray(obj.favoriteFolders)) { favoriteFolders = obj.favoriteFolders; saveFolders(); changed = true; }
        if (Array.isArray(obj.searchHistory)) { searchHistory = obj.searchHistory; saveSearchHistory(); renderSearchHistory(); changed = true; }
        // Delegate RSS restore to the RSS module if available
        try {
            if (obj.rssFeeds || obj.rssState) {
                if (window.A7LAS_RSS && typeof window.A7LAS_RSS.restore === 'function') {
                    window.A7LAS_RSS.restore({ rssFeeds: obj.rssFeeds || [], rssState: obj.rssState || null });
                    changed = true;
                }
            }
        } catch(e) { console.warn('RSS restore skipped:', e); }
        if (changed) { renderFolderSelect(); renderFoldersUI(); renderFavoritesList(); renderPinnedLinks(); }
        return changed;
    }

    // Wire up after DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        // Resolve elements
        drawer = document.getElementById('favorites-drawer');
        overlay = document.getElementById('drawer-overlay');
    toggleBtn = document.getElementById('favorites-toggle');
        closeBtn = document.getElementById('favorites-close');
        
        // Initialize SVG icons for favorites toggle
        favOriginalSVG = toggleBtn?.querySelector('svg')?.cloneNode(true);
        favCloseSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        favCloseSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        favCloseSVG.setAttribute('width', '12');
        favCloseSVG.setAttribute('height', '12');
        favCloseSVG.setAttribute('viewBox', '0 0 24 24');
        favCloseSVG.setAttribute('fill', 'none');
        favCloseSVG.setAttribute('stroke', 'currentColor');
        favCloseSVG.setAttribute('stroke-width', '2');
        favCloseSVG.setAttribute('stroke-linecap', 'round');
        favCloseSVG.setAttribute('stroke-linejoin', 'round');
        favCloseSVG.setAttribute('aria-hidden', 'true');
        const favLine1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        favLine1.setAttribute('x1', '18');
        favLine1.setAttribute('y1', '6');
        favLine1.setAttribute('x2', '6');
        favLine1.setAttribute('y2', '18');
        const favLine2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        favLine2.setAttribute('x1', '6');
        favLine2.setAttribute('y1', '6');
        favLine2.setAttribute('x2', '18');
        favLine2.setAttribute('y2', '18');
        favCloseSVG.appendChild(favLine1);
        favCloseSVG.appendChild(favLine2);
        
        searchInput = document.getElementById('favorites-search-input');
        favNameInput = document.getElementById('fav-name');
        favUrlInput = document.getElementById('fav-url');
    folderSelect = document.getElementById('fav-folder-select');
    folderFilterSelect = document.getElementById('fav-folder-filter');
    favSortSelect = document.getElementById('fav-sort');
        newFolderInput = document.getElementById('new-folder-name');
        addFolderBtn = document.getElementById('add-folder-button');
        addFavBtn = document.getElementById('fav-add-button');
        foldersContainer = document.getElementById('favorites-folders');
        listContainer = document.getElementById('favorites-list');

        backupModal = document.getElementById('backup-modal');
        backupSaveBtn = document.getElementById('backup-save-button');
        backupImportBtn = document.getElementById('backup-import-button');
        backupImportInput = document.getElementById('backup-import-input');
        backupDownloadBtn = document.getElementById('backup-download');
        backupCopyBtn = document.getElementById('backup-copy');
        backupEmailBtn = document.getElementById('backup-email-btn');
        backupFilenameInput = document.getElementById('backup-filename');
        backupEmailInput = document.getElementById('backup-email');
        
        // Mobile backup buttons
        const backupSaveMobile = document.getElementById('backup-save-mobile');
        const backupImportMobile = document.getElementById('backup-import-mobile');

        // Load state
        loadFavorites();
    renderFolderSelect();
    renderFolderFilter();
        renderFoldersUI();
        renderFavoritesList();
        renderPinnedLinks();

    // Drawer events
        if (toggleBtn) toggleBtn.addEventListener('click', function(e){
            e.preventDefault();
            if (drawer && drawer.classList.contains('open')) closeDrawer(); else { window.A7LAS_UI?.closeAllExcept?.('favorites'); openDrawer(); }
        });
        if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
        if (overlay) overlay.addEventListener('click', closeDrawer);
    window.addEventListener('resize', adjustFavLayout);

        // Search in favorites
        if (searchInput) searchInput.addEventListener('input', renderFavoritesList);

        // Folder filter (header)
        if (folderFilterSelect) folderFilterSelect.addEventListener('change', function(e){
            selectedFolder = e.target.value || 'All';
            renderFoldersUI();
            renderFavoritesList();
            syncFolderSelectToSelected();
        });

        // Toggle Atlas-only and Pinned-only filters
        const atlasBtn = document.getElementById('fav-filter-atlas');
        const pinnedBtn = document.getElementById('fav-filter-pinned');
        if (atlasBtn) atlasBtn.addEventListener('click', function(){
            filterAtlasOnly = !filterAtlasOnly;
            atlasBtn.setAttribute('aria-pressed', filterAtlasOnly ? 'true' : 'false');
            renderFavoritesList();
        });
        if (pinnedBtn) pinnedBtn.addEventListener('click', function(){
            filterPinnedOnly = !filterPinnedOnly;
            pinnedBtn.setAttribute('aria-pressed', filterPinnedOnly ? 'true' : 'false');
            renderFavoritesList();
        });

        // Sort selection
        if (favSortSelect) favSortSelect.addEventListener('change', renderFavoritesList);

        // Add folder
        if (addFolderBtn) addFolderBtn.addEventListener('click', function(){
            const name = (newFolderInput?.value || '').trim();
            if (!name) return;
            if (!favoriteFolders.includes(name)) {
                favoriteFolders.push(name);
                saveFolders();
                renderFolderSelect();
                renderFolderFilter();
                renderFoldersUI();
                if (typeof showToast === 'function') showToast('Folder added');
            }
            if (newFolderInput) newFolderInput.value = '';
        });

        // Add favorite
        if (addFavBtn) addFavBtn.addEventListener('click', function(){
            let url = (favUrlInput?.value || '').trim();
            let name = (favNameInput?.value || '').trim();
            const folder = (folderSelect?.value || 'General');
            
            if (!url) { if (typeof showToast === 'function') showToast('URL is required'); return; }
            url = normalizeUrl(url);
            if (!name) {
                try { name = new URL(url).hostname; } catch { name = url; }
            }
            const item = { 
                id: genId(), 
                name, 
                url, 
                folder, 
                isAtlas: false, 
                pinnedToSearch: false,
                createdAt: new Date().toISOString() 
            };
            favorites.unshift(item);
            saveFavorites();
            // ensure folder exists
            if (folder && !favoriteFolders.includes(folder)) {
                favoriteFolders.push(folder); saveFolders(); renderFolderSelect();
            }
            renderFoldersUI();
            renderFavoritesList();
            renderPinnedLinks();
            if (favNameInput) favNameInput.value = '';
            if (favUrlInput) favUrlInput.value = '';
            if (typeof showToast === 'function') showToast('Added to favorites');
        });

        // Backup Save (open modal)
        if (backupSaveBtn && backupModal) {
            backupSaveBtn.addEventListener('click', function(){
                // Default filename
                const d = new Date();
                const yyyy = d.getFullYear();
                const mm = String(d.getMonth()+1).padStart(2,'0');
                const dd = String(d.getDate()).padStart(2,'0');
                if (backupFilenameInput) backupFilenameInput.value = `a7las-backup-${yyyy}-${mm}-${dd}.json`;
                backupModal.classList.add('show');
            });
        }
        
        // Mobile backup save button
        if (backupSaveMobile && backupModal) {
            backupSaveMobile.addEventListener('click', function(e){
                e.preventDefault();
                const d = new Date();
                const yyyy = d.getFullYear();
                const mm = String(d.getMonth()+1).padStart(2,'0');
                const dd = String(d.getDate()).padStart(2,'0');
                if (backupFilenameInput) backupFilenameInput.value = `a7las-backup-${yyyy}-${mm}-${dd}.json`;
                backupModal.classList.add('show');
            });
        }
        
        // Mobile backup import button
        if (backupImportMobile && backupImportInput) {
            backupImportMobile.addEventListener('click', function(e){
                e.preventDefault();
                backupImportInput.click();
            });
        }
        
        // Close backup modal
        document.querySelectorAll('.close-modal[data-modal="backup-modal"]').forEach(btn => {
            btn.addEventListener('click', () => backupModal?.classList.remove('show'));
        });

        // Download JSON
        if (backupDownloadBtn) backupDownloadBtn.addEventListener('click', function(){
            const data = JSON.stringify(buildBackup(), null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = (backupFilenameInput?.value?.trim()) || 'a7las-backup.json';
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
            if (typeof showToast === 'function') showToast('Backup downloaded');
            backupModal?.classList.remove('show');
        });

        // Copy JSON
        if (backupCopyBtn) backupCopyBtn.addEventListener('click', async function(){
            const data = JSON.stringify(buildBackup(), null, 2);
            try { await navigator.clipboard.writeText(data); if (typeof showToast === 'function') showToast('Backup copied to clipboard'); } catch { if (typeof showToast === 'function') showToast('Copy failed'); }
        });

        // Email (mailto body with note)
        if (backupEmailBtn) backupEmailBtn.addEventListener('click', function(){
            const to = (backupEmailInput?.value || '').trim();
            const subject = encodeURIComponent('A7LAS Backup');
            const note = 'Backup JSON cannot be auto-attached via mailto. Please use Download JSON and attach the file to your email.';
            const body = encodeURIComponent(`${note}\n\nSummary:\n- Favorites: ${favorites.length}\n- Folders: ${favoriteFolders.length}\n- History items: ${Array.isArray(searchHistory) ? searchHistory.length : 0}`);
            const href = `mailto:${encodeURIComponent(to)}?subject=${subject}&body=${body}`;
            window.location.href = href;
            backupModal?.classList.remove('show');
        });

        // Trigger import
        if (backupImportBtn && backupImportInput) {
            backupImportBtn.addEventListener('click', () => backupImportInput.click());
            backupImportInput.addEventListener('change', function(e){
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = function(ev){
                    try {
                        const obj = JSON.parse(String(ev.target.result));
                        if (restoreBackup(obj)) {
                            if (typeof showToast === 'function') showToast('Backup imported');
                        } else {
                            if (typeof showToast === 'function') showToast('Invalid backup file');
                        }
                    } catch (err) {
                        if (typeof showToast === 'function') showToast('Invalid JSON');
                    }
                    backupImportInput.value = '';
                };
                reader.readAsText(file);
            });
        }
    });
})();

// =====================
// Radio overlay + player
// =====================
(function(){
    const radioToggle = document.getElementById('radio-toggle');
    const radioOverlay = document.getElementById('radio-overlay');
    const radioList = document.getElementById('radio-list');
    const radioTable = document.getElementById('radio-table');
    const tabGenres = document.getElementById('radio-tab-genres');
    const tabTable = document.getElementById('radio-tab-table');
    const radioPlayer = document.getElementById('radio-player');
    const radioCurrentName = document.getElementById('radio-current-name');
    const radioPlayBtn = document.getElementById('radio-play');
    const radioStopBtn = document.getElementById('radio-stop');
    const radioVolume = document.getElementById('radio-volume');
    const radioEq = document.getElementById('radio-eq');

    if (!radioToggle || !radioOverlay || !radioList || !radioPlayer) return;

    // Store original SVG for radio toggle
    const radioOriginalSVG = radioToggle.querySelector('svg')?.cloneNode(true);
    const closeSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    closeSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    closeSVG.setAttribute('width', '14');
    closeSVG.setAttribute('height', '14');
    closeSVG.setAttribute('viewBox', '0 0 24 24');
    closeSVG.setAttribute('fill', 'none');
    closeSVG.setAttribute('stroke', 'currentColor');
    closeSVG.setAttribute('stroke-width', '2');
    closeSVG.setAttribute('stroke-linecap', 'round');
    closeSVG.setAttribute('stroke-linejoin', 'round');
    closeSVG.setAttribute('aria-hidden', 'true');
    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '18');
    line1.setAttribute('y1', '6');
    line1.setAttribute('x2', '6');
    line1.setAttribute('y2', '18');
    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '6');
    line2.setAttribute('y1', '6');
    line2.setAttribute('x2', '18');
    line2.setAttribute('y2', '18');
    closeSVG.appendChild(line1);
    closeSVG.appendChild(line2);

    // Curated public streams by genre (can be extended)
    const radioStations = {
        'Pop': [
            { name: 'Radio Swiss Pop', url: 'https://stream.srg-ssr.ch/m/rsp/mp3_128' },
            { name: 'Radio Paradise – Main', url: 'https://stream.radioparadise.com/aac-320' },
            { name: 'Radio Nova', url: 'https://nova-icecast-prod.streamakaci.com/nova-midfi.mp3' },
            { name: 'KCRW Eclectic24', url: 'https://kcrw.streamguys1.com/kcrw_192k_mp3_e24' },
            { name: 'FIP', url: 'https://icecast.radiofrance.fr/fip-midfi.mp3' },
            { name: 'Radio Meuh', url: 'https://stream.radiomeuh.com/meuh.mp3' }
        ],
        'Rock': [
            { name: 'KEXP 90.3 FM', url: 'https://kexp-mp3-128.streamguys1.com/kexp128.mp3' },
            { name: 'RP – Rock Mix', url: 'https://stream.radioparadise.com/rock-320' },
            { name: 'SomaFM: Underground 80s', url: 'https://ice1.somafm.com/u80s-128-mp3' },
            { name: 'SomaFM: Indie Pop Rocks!', url: 'https://ice1.somafm.com/indiepop-128-mp3' },
            { name: 'SomaFM: The Trip', url: 'https://ice1.somafm.com/thetrip-128-mp3' },
            { name: 'FIP Rock', url: 'https://icecast.radiofrance.fr/fiprock-midfi.mp3' },
            { name: 'Radio X (UK)', url: 'https://media-ssl.musicradio.com/RadioXUK' }
        ],
        'Jazz': [
            { name: 'Radio Swiss Jazz', url: 'https://stream.srg-ssr.ch/m/rsj/mp3_128' },
            { name: 'FIP Jazz', url: 'https://icecast.radiofrance.fr/fipjazz-midfi.mp3' },
            { name: 'Jazz24', url: 'https://live.wostreaming.net/direct/ppm-jazz24mp3-ibc1' },
            { name: 'TSF Jazz', url: 'https://chai5she.cdn.dvmr.fr/tsfjazz.mp3' },
            { name: 'Jazz Radio (FR)', url: 'https://jazzradiocom.ice.infomaniak.ch/jazzradiocom-high.mp3' }
        ],
        'Classique': [
            { name: 'Radio Swiss Classic', url: 'https://stream.srg-ssr.ch/m/rsc_de/mp3_128' },
            { name: 'France Musique', url: 'https://icecast.radiofrance.fr/francemusique-midfi.mp3' },
            { name: 'ABC Classic', url: 'https://live-radio02.mediahubaustralia.com/2FMW/mp3/' },
            { name: 'KUSC Classical', url: 'https://kuscstream.org/kusc128.mp3' },
            { name: 'WQXR', url: 'https://stream.wqxr.org/wqxr' }
        ],
        'Electro': [
            { name: 'NTS Live 1', url: 'https://stream-relay-geo.ntslive.net/stream' },
            { name: 'NTS Live 2', url: 'https://stream-relay-geo.ntslive.net/stream2' },
            { name: 'SomaFM: Groove Salad', url: 'https://ice1.somafm.com/groovesalad-128-mp3' },
            { name: 'SomaFM: Drone Zone', url: 'https://ice1.somafm.com/dronezone-128-mp3' },
            { name: 'SomaFM: DEF CON Radio', url: 'https://ice1.somafm.com/defcon-128-mp3' },
            { name: 'SomaFM: Space Station Soma', url: 'https://ice1.somafm.com/spacestation-128-mp3' },
            { name: 'SomaFM: cliqhop idm', url: 'https://ice1.somafm.com/cliqhop-128-mp3' },
            { name: 'DI.FM Lounge', url: 'https://prem2.di.fm/lounge' },
            { name: 'DI.FM Chillout', url: 'https://prem2.di.fm/chillout' },
            { name: 'Triple J', url: 'https://live-radio02.mediahubaustralia.com/2TJW/mp3/' },
            { name: 'SomaFM: Beat Blender', url: 'https://ice1.somafm.com/beatblender-128-mp3' },
            { name: 'SomaFM: Digitalis', url: 'https://ice1.somafm.com/digitalis-128-mp3' },
            { name: 'SomaFM: Vaporwaves', url: 'https://ice1.somafm.com/vaporwaves-128-mp3' },
            { name: 'Nightride: Chillsynth', url: 'https://stream.nightride.fm/chillsynth.mp3' },
            { name: 'Nightride: Outrun', url: 'https://stream.nightride.fm/outrun.mp3' },
            { name: 'Nightride: Darksynth', url: 'https://stream.nightride.fm/darksynth.mp3' },
            { name: 'Dance Wave!', url: 'https://stream.dancewave.online/dance.mp3' },
            { name: 'Radio FG', url: 'https://radiofg.impek.com/fg' }
        ],
        'Hip‑Hop': [
            { name: 'Hot 108 Jamz', url: 'https://sc.hot108.com/hot108' },
            { name: 'Mouv’', url: 'https://icecast.radiofrance.fr/mouv-midfi.mp3' },
            { name: 'SomaFM: The Trip Hop Channel', url: 'https://ice1.somafm.com/suburbsofgoa-128-mp3' }
        ],
        'Chill/Ambient': [
            { name: 'SomaFM: Lush', url: 'https://ice1.somafm.com/lush-128-mp3' },
            { name: 'SomaFM: Fluid', url: 'https://ice1.somafm.com/fluid-128-mp3' },
            { name: 'SomaFM: Deep Space One', url: 'https://ice1.somafm.com/deepspaceone-128-mp3' },
            { name: 'SomaFM: Mission Control', url: 'https://ice1.somafm.com/missioncontrol-128-mp3' },
            { name: 'SomaFM: Groove Salad Classic', url: 'https://ice1.somafm.com/gsclassic-128-mp3' },
            { name: 'SomaFM: Sonic Universe', url: 'https://ice1.somafm.com/sonicuniverse-128-mp3' },
            { name: 'SomaFM: ThistleRadio', url: 'https://ice1.somafm.com/thistle-128-mp3' },
            { name: 'Radio Paradise – Mellow', url: 'https://stream.radioparadise.com/mellow-320' },
            { name: 'Chilltrax', url: 'https://streaming.shoutcast.com/chilltrax' },
            { name: 'Nightride: Lofi', url: 'https://stream.nightride.fm/lofi.mp3' }
        ],
        'Soul/Funk': [
            { name: 'SomaFM: Seven Inch Soul', url: 'https://ice1.somafm.com/7soul-128-mp3' },
            { name: 'FIP Groove', url: 'https://icecast.radiofrance.fr/fipgroove-midfi.mp3' },
            { name: 'Soul Radio (NL)', url: 'https://stream.soulradio.nl/soulradio.mp3' }
        ],
        'Reggae/World': [
            { name: 'FIP Reggae', url: 'https://icecast.radiofrance.fr/fipreggae-midfi.mp3' },
            { name: 'FIP Monde', url: 'https://icecast.radiofrance.fr/fipworld-midfi.mp3' },
            { name: 'SomaFM: Suburbs of Goa', url: 'https://ice1.somafm.com/suburbsofgoa-128-mp3' },
            { name: 'SomaFM: Heavyweight Reggae', url: 'https://ice1.somafm.com/reggae-128-mp3' }
        ],
        'Lounge/Exotica': [
            { name: 'SomaFM: Secret Agent', url: 'https://ice1.somafm.com/secretagent-128-mp3' },
            { name: 'SomaFM: Illinois Street Lounge', url: 'https://ice1.somafm.com/illstreet-128-mp3' },
            { name: 'SomaFM: Black Rock FM', url: 'https://ice1.somafm.com/brfm-128-mp3' }
        ],
        'Alt/Indie': [
            { name: 'SomaFM: BAGeL Radio', url: 'https://ice1.somafm.com/bagel-128-mp3' },
            { name: 'SomaFM: PopTron', url: 'https://ice1.somafm.com/poptron-128-mp3' },
            { name: 'FluxFM', url: 'https://fluxfm.hoerradar.de/fluxfmberlin-live-mp3-hq' },
            { name: 'ByteFM', url: 'https://bytefm.cast.addradio.de/bytefm/main/mid/stream.mp3' }
        ],
        'Metal/Heavy': [
            { name: 'SomaFM: Doomed', url: 'https://ice1.somafm.com/doomed-128-mp3' },
            { name: 'SomaFM: Metal Detector', url: 'https://ice1.somafm.com/metal-128-mp3' },
            { name: 'FIP Metal', url: 'https://icecast.radiofrance.fr/fipmetal-midfi.mp3' }
        ],
        'Americana/Country': [
            { name: 'SomaFM: Boot Liquor', url: 'https://ice1.somafm.com/bootliquor-128-mp3' },
            { name: 'SomaFM: Left Coast 70s', url: 'https://ice1.somafm.com/seventies-128-mp3' }
        ],
        'News': [
            { name: 'France Info', url: 'https://icecast.radiofrance.fr/franceinfo-midfi.mp3' },
            { name: 'NPR', url: 'https://npr-ice.streamguys1.com/live.mp3' },
            { name: 'RFI Monde', url: 'https://live02.rfi.fr/rfimonde-96k.mp3' },
            { name: 'BBC World Service', url: 'https://stream.live.vc.bbcmedia.co.uk/bbc_world_service' },
            { name: 'France Culture', url: 'https://icecast.radiofrance.fr/franceculture-midfi.mp3' }
        ]
    };

    function renderRadioList(){
        radioList.innerHTML = '';
        Object.keys(radioStations).forEach((genre) => {
            const section = document.createElement('section');
            section.className = 'radio-genre';
            const h4 = document.createElement('h4');
            h4.textContent = genre;
            const grid = document.createElement('div');
            grid.className = 'radio-stations';
            radioStations[genre].forEach(st => {
                const btn = document.createElement('button');
                btn.className = 'radio-station-button';
                btn.textContent = st.name;
                btn.dataset.url = st.url;
                btn.addEventListener('click', (e)=>{
                    e.preventDefault();
                    playStation(st.name, st.url);
                    closeOverlay();
                });
                grid.appendChild(btn);
            });
            section.appendChild(h4);
            section.appendChild(grid);
            radioList.appendChild(section);
        });
    }

    function flattenStations(){
        const out = [];
        Object.keys(radioStations).forEach(genre => {
            radioStations[genre].forEach(st => out.push({ ...st, genre }));
        });
        return out;
    }

    function renderRadioTable(){
        radioTable.innerHTML = '';
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        thead.innerHTML = '<tr><th>Station</th><th>Genre</th><th style="width:120px">Action</th></tr>';
        const tbody = document.createElement('tbody');
        flattenStations().forEach(st => {
            const tr = document.createElement('tr');
            const tdName = document.createElement('td');
            tdName.textContent = st.name;
            const tdGenre = document.createElement('td');
            tdGenre.textContent = st.genre;
            const tdPlay = document.createElement('td');
            tdPlay.className = 'play-cell';
            const playBtn = document.createElement('button');
            playBtn.textContent = 'Play';
            playBtn.addEventListener('click', (e)=>{ e.preventDefault(); playStation(st.name, st.url); closeOverlay(); });
            tdPlay.appendChild(playBtn);
            tr.appendChild(tdName);
            tr.appendChild(tdGenre);
            tr.appendChild(tdPlay);
            tbody.appendChild(tr);
        });
        table.appendChild(thead);
        table.appendChild(tbody);
        radioTable.appendChild(table);
    }

    // Audio pipeline
    const audioEl = new Audio();
    audioEl.crossOrigin = 'anonymous';
    audioEl.preload = 'none';
    audioEl.volume = 0.8;

    let audioCtx;
    let sourceNode;
    let lowShelf;
    let highShelf;

    function ensureAudioContext(){
        if (!audioCtx) {
            const Ctx = window.AudioContext || window.webkitAudioContext;
            audioCtx = new Ctx();
            sourceNode = audioCtx.createMediaElementSource(audioEl);
            lowShelf = audioCtx.createBiquadFilter();
            lowShelf.type = 'lowshelf';
            lowShelf.frequency.value = 200;
            lowShelf.gain.value = 0;
            highShelf = audioCtx.createBiquadFilter();
            highShelf.type = 'highshelf';
            highShelf.frequency.value = 3000;
            highShelf.gain.value = 0;
            sourceNode.connect(lowShelf).connect(highShelf).connect(audioCtx.destination);
        }
    }

    function setEq(preset){
        ensureAudioContext();
        switch(preset){
            case 'bass':
                lowShelf.gain.value = 8;
                highShelf.gain.value = 0;
                break;
            case 'treble':
                lowShelf.gain.value = 0;
                highShelf.gain.value = 6;
                break;
            case 'voice':
                lowShelf.gain.value = -6;
                highShelf.gain.value = 3;
                break;
            default:
                lowShelf.gain.value = 0;
                highShelf.gain.value = 0;
        }
    }

    function playStation(name, url){
        ensureAudioContext();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        audioEl.src = url;
        audioEl.play().catch(()=>{});
        radioCurrentName.textContent = name;
        radioPlayer.classList.remove('hide');
        radioPlayer.setAttribute('aria-hidden', 'false');
        updatePlayButton();
        adjustRadioLayout();
    }

    function updatePlayButton(){
        if (!radioPlayBtn) return;
        radioPlayBtn.textContent = audioEl.paused ? '⏵' : '⏸';
    }

    function openOverlay(){
        radioOverlay.classList.remove('hide');
        radioOverlay.setAttribute('aria-hidden','false');
        if (radioToggle) {
            radioToggle.classList.add('active');
            radioToggle.setAttribute('aria-expanded','true');
            // Replace SVG with close icon
            const svg = radioToggle.querySelector('svg');
            if (svg) svg.replaceWith(closeSVG.cloneNode(true));
        }
        adjustRadioLayout();
    }
    function closeOverlay(){
        radioOverlay.classList.add('hide');
        radioOverlay.setAttribute('aria-hidden','true');
        if (radioToggle) {
            radioToggle.classList.remove('active');
            radioToggle.setAttribute('aria-expanded','false');
            // Restore original SVG
            const svg = radioToggle.querySelector('svg');
            if (svg && radioOriginalSVG) svg.replaceWith(radioOriginalSVG.cloneNode(true));
        }
    }

    // Expose UI helpers
    window.A7LAS_UI = window.A7LAS_UI || {};
    window.A7LAS_UI.openRadio = openOverlay;
    window.A7LAS_UI.closeRadio = closeOverlay;
    window.A7LAS_UI.isRadioOpen = () => !radioOverlay.classList.contains('hide');
    if (!window.A7LAS_UI.closeAllExcept) {
        window.A7LAS_UI.closeAllExcept = function(name){
            try {
                if (name !== 'radio' && typeof window.A7LAS_UI.closeRadio === 'function') window.A7LAS_UI.closeRadio();
                if (name !== 'rss' && typeof window.A7LAS_UI.closeRSS === 'function') window.A7LAS_UI.closeRSS();
                if (name !== 'favorites' && typeof window.A7LAS_UI.closeFavorites === 'function') window.A7LAS_UI.closeFavorites();
            } catch(_) {}
        };
    }

    function adjustRadioLayout(){
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        const top = header ? header.offsetHeight : 56;
        const bottom = footer ? footer.offsetHeight : 44;
        radioOverlay.style.top = top + 'px';
        // prevent overlay content from being hidden under the footer
        radioOverlay.style.bottom = bottom + 'px';
        // keep player sitting above the footer, without overlapping it
        radioPlayer.style.bottom = bottom + 'px';
    }

    // Events
    radioToggle.addEventListener('click', (e)=>{
        e.preventDefault();
        if (radioOverlay.classList.contains('hide')) { window.A7LAS_UI?.closeAllExcept?.('radio'); openOverlay(); } else { closeOverlay(); }
    });
    window.addEventListener('resize', adjustRadioLayout);
    window.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') closeOverlay(); });

    // Tabs switching
    function activateGenres(){
        tabGenres?.classList.add('active');
        tabGenres?.setAttribute('aria-selected','true');
        tabTable?.classList.remove('active');
        tabTable?.setAttribute('aria-selected','false');
        radioList.classList.remove('hide');
        radioTable.classList.add('hide');
    }
    function activateTable(){
        tabTable?.classList.add('active');
        tabTable?.setAttribute('aria-selected','true');
        tabGenres?.classList.remove('active');
        tabGenres?.setAttribute('aria-selected','false');
        radioList.classList.add('hide');
        radioTable.classList.remove('hide');
    }
    tabGenres?.addEventListener('click', activateGenres);
    tabTable?.addEventListener('click', activateTable);

    if (radioPlayBtn) radioPlayBtn.addEventListener('click', ()=>{
        ensureAudioContext();
        if (audioEl.src) {
            if (audioEl.paused) {
                audioEl.play().catch(()=>{});
                if (audioCtx.state === 'suspended') audioCtx.resume();
            } else {
                audioEl.pause();
            }
        }
        updatePlayButton();
    });
    if (radioStopBtn) radioStopBtn.addEventListener('click', ()=>{
        audioEl.pause();
        try { audioEl.currentTime = 0; } catch {}
        updatePlayButton();
    });
    if (radioVolume) radioVolume.addEventListener('input', ()=>{
        const v = parseFloat(radioVolume.value);
        audioEl.volume = isFinite(v) ? v : 0.8;
    });
    if (radioEq) radioEq.addEventListener('change', ()=> setEq(radioEq.value));

    audioEl.addEventListener('play', updatePlayButton);
    audioEl.addEventListener('pause', updatePlayButton);

    // Init
    renderRadioList();
    renderRadioTable();
    if (radioVolume) radioVolume.value = String(audioEl.volume);
    adjustRadioLayout();
})();

// =====================
// RSS overlay + reader
// =====================
(function(){
    const rssToggle = document.getElementById('rss-toggle');
    const rssOverlay = document.getElementById('rss-overlay');
    if (!rssToggle || !rssOverlay) return;

    // Store original SVG for RSS toggle
    const rssOriginalSVG = rssToggle.querySelector('svg')?.cloneNode(true);
    const rssCloseSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    rssCloseSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    rssCloseSVG.setAttribute('width', '14');
    rssCloseSVG.setAttribute('height', '14');
    rssCloseSVG.setAttribute('viewBox', '0 0 24 24');
    rssCloseSVG.setAttribute('fill', 'none');
    rssCloseSVG.setAttribute('stroke', 'currentColor');
    rssCloseSVG.setAttribute('stroke-width', '2');
    rssCloseSVG.setAttribute('stroke-linecap', 'round');
    rssCloseSVG.setAttribute('stroke-linejoin', 'round');
    rssCloseSVG.setAttribute('aria-hidden', 'true');
    const rssLine1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    rssLine1.setAttribute('x1', '18');
    rssLine1.setAttribute('y1', '6');
    rssLine1.setAttribute('x2', '6');
    rssLine1.setAttribute('y2', '18');
    const rssLine2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    rssLine2.setAttribute('x1', '6');
    rssLine2.setAttribute('y1', '6');
    rssLine2.setAttribute('x2', '18');
    rssLine2.setAttribute('y2', '18');
    rssCloseSVG.appendChild(rssLine1);
    rssCloseSVG.appendChild(rssLine2);

    // UI refs
    const feedListEl = document.getElementById('rss-feed-list');
    const addBtn = document.getElementById('rss-add-btn');
    const newUrlInput = document.getElementById('rss-new-url');
    const importBtn = document.getElementById('rss-import-btn');
    const importInput = document.getElementById('rss-import-input');
    const articlesHeaderTitle = document.getElementById('rss-current-feed-title');
    const articlesListEl = document.getElementById('rss-articles-list');
    const articleCountBadge = document.getElementById('rss-article-count');
    
    // Modal refs
    const modal = document.getElementById('rss-modal');
    const modalOverlay = modal?.querySelector('.rss-modal-overlay');
    const modalTitle = document.getElementById('rss-modal-title');
    const modalMeta = document.getElementById('rss-modal-meta');
    const modalArticle = document.getElementById('rss-modal-article');
    const modalOpen = document.getElementById('rss-modal-open');
    const modalPdf = document.getElementById('rss-modal-pdf');
    const modalClose = document.getElementById('rss-modal-close');

    // Storage keys
    const RSS_KEY = 'z1_rss_feeds_v1';
    const RSS_STATE_KEY = 'z1_rss_state_v1';

    // State
    let rssFeeds = []; // [{id, title, url, createdAt, items: [...], lastFetched}]
    let rssState = { selectedFeedId: null };
    let currentModalItem = null;

    // Utilities
    function genId(){ return 'rss_' + Math.random().toString(36).slice(2) + Date.now().toString(36); }
    function showMsg(text){ try{ if (typeof showToast === 'function') showToast(text); }catch(_){ /* noop */ } }

    function loadRss(){
        try { const raw = localStorage.getItem(RSS_KEY); rssFeeds = raw ? JSON.parse(raw) : []; } catch { rssFeeds = []; }
        try { const rawS = localStorage.getItem(RSS_STATE_KEY); rssState = rawS ? JSON.parse(rawS) : { selectedFeedId: '__ALL__' }; } catch { rssState = { selectedFeedId: '__ALL__' }; }
        // Default to "All Feeds" if no selection or if saved selection is invalid
        if (!rssState.selectedFeedId || (rssState.selectedFeedId !== '__ALL__' && !rssFeeds.find(f => f.id === rssState.selectedFeedId))) {
            rssState.selectedFeedId = '__ALL__';
        }
    }
    function saveRss(){ try{ localStorage.setItem(RSS_KEY, JSON.stringify(rssFeeds)); }catch{} }
    function saveRssState(){ try{ localStorage.setItem(RSS_STATE_KEY, JSON.stringify(rssState)); }catch{} }

    function adjustRssLayout(){
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        const top = header ? header.offsetHeight : 56;
        const bottom = footer ? footer.offsetHeight : 44;
        rssOverlay.style.top = top + 'px';
        rssOverlay.style.bottom = bottom + 'px';
    }

    function openOverlay(){
        rssOverlay.classList.remove('hide');
        rssOverlay.setAttribute('aria-hidden','false');
        rssToggle.classList.add('active');
        rssToggle.setAttribute('aria-expanded','true');
        // Replace SVG with close icon
        const svg = rssToggle.querySelector('svg');
        if (svg) svg.replaceWith(rssCloseSVG.cloneNode(true));
        adjustRssLayout();
    }
    function closeOverlay(){
        rssOverlay.classList.add('hide');
        rssOverlay.setAttribute('aria-hidden','true');
        rssToggle.classList.remove('active');
        rssToggle.setAttribute('aria-expanded','false');
        // Restore original SVG
        const svg = rssToggle.querySelector('svg');
        if (svg && rssOriginalSVG) svg.replaceWith(rssOriginalSVG.cloneNode(true));
        // Also ensure article modal is closed when leaving RSS
        try { if (modal && !modal.classList.contains('hide')) closeModal(); } catch(_) {}
    }

    // Expose UI helpers
    window.A7LAS_UI = window.A7LAS_UI || {};
    window.A7LAS_UI.openRSS = openOverlay;
    window.A7LAS_UI.closeRSS = closeOverlay;
    window.A7LAS_UI.isRSSOpen = () => !rssOverlay.classList.contains('hide');

    function openModal(item){
        if (!modal || !item) return;
        currentModalItem = item;
        
        modalTitle.textContent = item.title || '(no title)';
        
        // Meta
        let metaHtml = '';
        if (item.pubDate || item.updated) {
            const dateStr = item.pubDate || item.updated;
            metaHtml += `<span>📅 ${escapeHtml(dateStr)}</span>`;
        }
        if (item.link) {
            try {
                const hostname = new URL(item.link).hostname.replace('www.','');
                metaHtml += `<span>🔗 ${escapeHtml(hostname)}</span>`;
            } catch {}
        }
        modalMeta.innerHTML = metaHtml;
        
        // Content
        const content = sanitizeHtml(item.content || item.summary || item.description || '<p><em>No content available.</em></p>');
        modalArticle.innerHTML = content;
        modalArticle.querySelectorAll('a').forEach(a=>{ a.setAttribute('target','_blank'); a.setAttribute('rel','noopener'); });
        
        modal.classList.remove('hide');
        modal.setAttribute('aria-hidden','false');
    }
    
    function closeModal(){
        if (!modal) return;
        modal.classList.add('hide');
        modal.setAttribute('aria-hidden','true');
        currentModalItem = null;
    }

    function renderFeedList(){
        if (!feedListEl) return;
        feedListEl.innerHTML = '';
        const countBadge = document.getElementById('rss-feed-count');
        if (countBadge) countBadge.textContent = String(rssFeeds.length);
        
        // Add "All Feeds" virtual feed at the top
        const allLi = document.createElement('li');
        if (rssState.selectedFeedId === '__ALL__') allLi.classList.add('active');
        const allEntry = document.createElement('div');
        allEntry.className = 'rss-feed-entry';
        const allName = document.createElement('div');
        allName.className = 'rss-feed-name';
        allName.textContent = '🌐 All Feeds (Mixed)';
        allName.title = 'All feeds merged and sorted by date';
        const allUrl = document.createElement('div');
        allUrl.className = 'rss-feed-url';
        const totalArticles = rssFeeds.reduce((sum, f) => sum + (f.items?.length || 0), 0);
        allUrl.textContent = `${rssFeeds.length} feeds • ${totalArticles} articles`;
        allEntry.appendChild(allName);
        allEntry.appendChild(allUrl);
        allLi.appendChild(allEntry);
        allLi.addEventListener('click', ()=> selectFeed('__ALL__'));
        feedListEl.appendChild(allLi);
        
        // Individual feeds
        rssFeeds.forEach(feed => {
            const li = document.createElement('li');
            if (rssState.selectedFeedId === feed.id) li.classList.add('active');
            
            const entryDiv = document.createElement('div');
            entryDiv.className = 'rss-feed-entry';
            
            const nameDiv = document.createElement('div');
            nameDiv.className = 'rss-feed-name';
            nameDiv.textContent = feed.title || feed.url;
            nameDiv.title = feed.title || feed.url;
            
            const urlDiv = document.createElement('div');
            urlDiv.className = 'rss-feed-url';
            urlDiv.textContent = feed.url;
            urlDiv.title = feed.url;
            
            entryDiv.appendChild(nameDiv);
            entryDiv.appendChild(urlDiv);
            
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'rss-feed-actions';
            
            const rem = document.createElement('button');
            rem.className = 'rss-btn';
            rem.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
            rem.title = 'Remove';
            rem.addEventListener('click', (e)=>{ e.stopPropagation(); removeFeed(feed.id); });
            
            actionsDiv.appendChild(rem);
            
            li.appendChild(entryDiv);
            li.appendChild(actionsDiv);
            li.addEventListener('click', ()=> selectFeed(feed.id));
            feedListEl.appendChild(li);
        });
    }

    function renderArticlesList(){
        if (!articlesListEl) return;
        console.log('[RSS] renderArticlesList: selectedFeedId=', rssState.selectedFeedId);
        
        // Handle "All Feeds" virtual feed
        if (rssState.selectedFeedId === '__ALL__') {
            articlesHeaderTitle.textContent = '🌐 All Feeds (Mixed)';
            
            // Add masonry grid class for All Feeds view
            articlesListEl.classList.add('masonry-grid');
            
            // Collect all articles from all feeds with source feed info
            const allArticles = [];
            rssFeeds.forEach(feed => {
                if (Array.isArray(feed.items)) {
                    feed.items.forEach(item => {
                        allArticles.push({
                            ...item,
                            _feedTitle: feed.title || feed.url,
                            _feedUrl: feed.url
                        });
                    });
                }
            });
            
            // Sort by date (newest first)
            allArticles.sort((a, b) => {
                const dateA = parseDateForSort(a.pubDate || a.updated);
                const dateB = parseDateForSort(b.pubDate || b.updated);
                return dateB - dateA; // descending
            });
            
            if (allArticles.length === 0) {
                articleCountBadge.style.display = 'none';
                articlesListEl.innerHTML = `
                    <div class="rss-empty">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.3;margin-bottom:12px;">
                            <path d="M4 11a9 9 0 0 1 9 9"></path>
                            <path d="M4 4a16 16 0 0 1 16 16"></path>
                            <circle cx="5" cy="19" r="1"></circle>
                        </svg>
                        <p>Add feeds from the sidebar to start reading.</p>
                    </div>
                `;
                console.log('[RSS] No articles in any feed');
                return;
            }
            
            console.log('[RSS] Rendering', allArticles.length, 'mixed articles from', rssFeeds.length, 'feeds');
            articleCountBadge.style.display = 'inline-flex';
            articleCountBadge.textContent = String(allArticles.length);
            
            articlesListEl.innerHTML = '';
            allArticles.forEach(item => {
                const li = document.createElement('li');
                
                const titleEl = document.createElement('h3');
                titleEl.className = 'rss-article-title';
                titleEl.textContent = item.title || '(no title)';
                
                const excerptEl = document.createElement('p');
                excerptEl.className = 'rss-article-excerpt';
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = sanitizeHtml(item.content || item.summary || item.description || '');
                const plainText = (tempDiv.textContent || tempDiv.innerText || '').trim();
                excerptEl.textContent = plainText.substring(0, 180) + (plainText.length > 180 ? '...' : '');
                
                const metaEl = document.createElement('div');
                metaEl.className = 'rss-article-meta';
                
                // Show source feed (without emoji)
                const feedSpan = document.createElement('span');
                feedSpan.textContent = item._feedTitle;
                feedSpan.style.fontWeight = '600';
                metaEl.appendChild(feedSpan);
                
                if (item.pubDate || item.updated) {
                    const span = document.createElement('span');
                    span.textContent = item.pubDate || item.updated;
                    metaEl.appendChild(span);
                }
                if (item.link) {
                    try {
                        const hostname = new URL(item.link).hostname.replace('www.','');
                        const span = document.createElement('span');
                        span.textContent = hostname;
                        metaEl.appendChild(span);
                    } catch {}
                }
                
                li.appendChild(titleEl);
                li.appendChild(excerptEl);
                li.appendChild(metaEl);
                li.addEventListener('click', ()=> openModal(item));
                articlesListEl.appendChild(li);
            });
            return;
        }
        
        // Single feed view - remove masonry grid class
        articlesListEl.classList.remove('masonry-grid');
        
        const feed = rssFeeds.find(f=>f.id===rssState.selectedFeedId);
        console.log('[RSS] Single feed view, feed=', feed);
        articlesHeaderTitle.textContent = feed ? (feed.title || feed.url) : 'Select a feed';
        
        if (!feed || !feed.items || feed.items.length === 0) {
            articleCountBadge.style.display = 'none';
            articlesListEl.innerHTML = `
                <div class="rss-empty">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.3;margin-bottom:12px;">
                        <path d="M4 11a9 9 0 0 1 9 9"></path>
                        <path d="M4 4a16 16 0 0 1 16 16"></path>
                        <circle cx="5" cy="19" r="1"></circle>
                    </svg>
                    <p>Add a feed from the sidebar to start reading.</p>
                </div>
            `;
            console.log('[RSS] No feed or items, showing empty state');
            return;
        }
        
        console.log('[RSS] Rendering', feed.items.length, 'articles');
        articleCountBadge.style.display = 'inline-flex';
        articleCountBadge.textContent = String(feed.items.length);
        
        articlesListEl.innerHTML = '';
        feed.items.forEach(item => {
            const li = document.createElement('li');
            
            const titleEl = document.createElement('h3');
            titleEl.className = 'rss-article-title';
            titleEl.textContent = item.title || '(no title)';
            
            const excerptEl = document.createElement('p');
            excerptEl.className = 'rss-article-excerpt';
            // Extract text from HTML content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = sanitizeHtml(item.content || item.summary || item.description || '');
            const plainText = (tempDiv.textContent || tempDiv.innerText || '').trim();
            excerptEl.textContent = plainText.substring(0, 180) + (plainText.length > 180 ? '...' : '');
            
            const metaEl = document.createElement('div');
            metaEl.className = 'rss-article-meta';
            if (item.pubDate || item.updated) {
                const span = document.createElement('span');
                span.textContent = '📅 ' + (item.pubDate || item.updated);
                metaEl.appendChild(span);
            }
            if (item.link) {
                try {
                    const hostname = new URL(item.link).hostname.replace('www.','');
                    const span = document.createElement('span');
                    span.textContent = '🔗 ' + hostname;
                    metaEl.appendChild(span);
                } catch {}
            }
            
            li.appendChild(titleEl);
            li.appendChild(excerptEl);
            li.appendChild(metaEl);
            li.addEventListener('click', ()=> openModal(item));
            articlesListEl.appendChild(li);
        });
    }

    function normalizeFeedUrl(input){
        const raw = String(input || '').trim();
        if (!raw) return '';
        if (/^https?:\/\//i.test(raw)) return raw;
        return 'https://' + raw; // default to https
    }

    function swapScheme(u){
        try {
            const url = new URL(u);
            url.protocol = url.protocol === 'https:' ? 'http:' : 'https:';
            return url.toString();
        } catch { return u; }
    }

    async function addFeed(url){
        url = normalizeFeedUrl(url);
        if (!url) return;
        showMsg('Loading feed...');
        try {
            let data = await fetchAndParse(url);
            console.log('[RSS] Parsed feed:', data?.title, 'items:', data?.items?.length || 0);
            // If parsing returned no items, try alternate scheme as a fallback
            if (!data || !Array.isArray(data.items) || data.items.length === 0) {
                const alt = swapScheme(url);
                if (alt && alt !== url) {
                    console.log('[RSS] Retrying with alternate scheme:', alt);
                    try { data = await fetchAndParse(alt); url = alt; } catch(_) {}
                }
            }
            const title = data?.title || url;
            const items = Array.isArray(data?.items) ? data.items : [];
            console.log('[RSS] Final items count:', items.length);
            if (!items.length) {
                showMsg('Feed added but no articles found');
            } else {
                showMsg('Feed added');
            }
            const feed = { id: genId(), title, url, createdAt: new Date().toISOString(), items: items.slice(0, 50), lastFetched: Date.now() };
            rssFeeds.unshift(feed);
            saveRss();
            // Auto-select "All Feeds" when adding a new feed to show the mixed view
            rssState.selectedFeedId = '__ALL__'; 
            saveRssState();
            console.log('[RSS] Selected feed ID: __ALL__ (mixed view)');
            renderFeedList();
            renderArticlesList();
            console.log('[RSS] Render complete');
            if (newUrlInput) newUrlInput.value = '';
        } catch(e){ console.error('[RSS] Add feed error:', e); showMsg('Failed to add feed: ' + e.message); }
    }

    function removeFeed(id){
        const idx = rssFeeds.findIndex(f=>f.id===id);
        if (idx >= 0) { rssFeeds.splice(idx,1); saveRss(); }
        if (rssState.selectedFeedId === id) { rssState.selectedFeedId = null; saveRssState(); }
        renderFeedList();
        renderArticlesList();
        showMsg('Feed removed');
    }

    async function selectFeed(id){
        console.log('[RSS] selectFeed called with id:', id);
        
        // Handle "All Feeds" virtual feed
        if (id === '__ALL__') {
            rssState.selectedFeedId = '__ALL__';
            saveRssState();
            renderFeedList();
            renderArticlesList();
            return;
        }
        
        // Handle individual feed
        const feed = rssFeeds.find(f=>f.id===id); 
        if (!feed) {
            console.warn('[RSS] Feed not found:', id);
            return;
        }
        
        rssState.selectedFeedId = id; 
        saveRssState();
        
        // Refresh if stale (>30 minutes) or empty
        const stale = !feed.lastFetched || (Date.now() - feed.lastFetched > 30*60*1000) || !Array.isArray(feed.items) || feed.items.length === 0;
        if (stale) {
            try {
                const { title, items } = await fetchAndParse(feed.url);
                feed.title = title || feed.title;
                feed.items = (items || []).slice(0, 50);
                feed.lastFetched = Date.now();
                saveRss();
            } catch(e){ console.warn('[RSS] Refresh failed:', e); }
        }
        renderFeedList();
        renderArticlesList();
    }

    async function fetchAndParse(url){
        const txt = await fetchWithCorsFallback(url);
        return parseFeedXml(txt, url);
    }

    async function fetchWithCorsFallback(url){
        // Prefer decoding using declared or sniffed charset to fix accent issues
        async function fetchDecode(u){
            const r = await fetch(u, { mode: 'cors' });
            if (!r.ok) throw new Error('HTTP ' + r.status);
            const buf = await r.arrayBuffer();
            let ct = r.headers.get('content-type') || '';
            let charset = (ct.match(/charset=([^;]+)/i) || [])[1];
            let text = new TextDecoder((charset || 'utf-8')).decode(new Uint8Array(buf));
            if (!charset) {
                const m = text.match(/<\?xml[^>]*encoding=["']([^"']+)["']/i);
                if (m && m[1] && m[1].toLowerCase() !== 'utf-8') {
                    try { text = new TextDecoder(m[1]).decode(new Uint8Array(buf)); } catch(_) {}
                }
            }
            return text;
        }

        // Try direct
        try { return await fetchDecode(url); } catch(_) {}
        // AllOrigins fallback (raw)
        const proxy = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);
        try { return await fetchDecode(proxy); } catch(e) { throw new Error('Fetch failed'); }
    }

    function parseFeedXml(xmlText, srcUrl){
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, 'text/xml');
        // Check parsererror
        if (xml.getElementsByTagName('parsererror').length) {
            console.error('[RSS] XML parse error');
            return { title: srcUrl, items: [] };
        }
        
        const rootName = xml.documentElement.nodeName.toLowerCase();
        console.log('[RSS] Root element:', rootName);
        
        // Atom feed
        if (rootName === 'feed') {
            const nsAtom = xml.documentElement.namespaceURI;
            const title = textContent(xml, 'title');
            const entries = Array.from(xml.getElementsByTagName('entry')).map(entry => {
                // Atom link can be in href attribute or text content
                let link = '';
                const linkEl = entry.getElementsByTagName('link')[0];
                if (linkEl) {
                    link = linkEl.getAttribute('href') || linkEl.textContent.trim();
                }
                return {
                    title: textContent(entry, 'title') || '(no title)',
                    link: link,
                    pubDate: textContent(entry, 'updated') || textContent(entry, 'published') || '',
                    updated: textContent(entry, 'updated') || textContent(entry, 'published') || '',
                    content: textContent(entry, 'content') || textContent(entry, 'summary') || '',
                    summary: textContent(entry, 'summary') || '',
                    description: textContent(entry, 'summary') || ''
                };
            });
            console.log('[RSS] Parsed as Atom, entries:', entries.length);
            return { title, items: entries };
        }
        
        // RSS 2.0 (and 0.9x)
        if (rootName === 'rss') {
            const channel = xml.getElementsByTagName('channel')[0];
            const title = channel ? textContent(channel, 'title') : srcUrl;
            const items = Array.from(xml.getElementsByTagName('item')).map(item => ({
                title: textContent(item, 'title') || '(no title)',
                link: textContent(item, 'link') || '',
                pubDate: textContent(item, 'pubDate') || textContent(item, 'dc:date') || '',
                content: textContent(item, 'content:encoded') || textContent(item, 'description') || '',
                description: textContent(item, 'description') || '',
                summary: textContent(item, 'description') || ''
            }));
            console.log('[RSS] Parsed as RSS 2.0, items:', items.length);
            return { title, items };
        }
        
        // RSS 1.0 / RDF
        if (rootName === 'rdf:rdf' || rootName === 'rdf') {
            const channel = xml.getElementsByTagName('channel')[0];
            const title = channel ? textContent(channel, 'title') : textContent(xml, 'title') || srcUrl;
            const items = Array.from(xml.getElementsByTagName('item')).map(item => ({
                title: textContent(item, 'title') || '(no title)',
                link: textContent(item, 'link') || '',
                pubDate: textContent(item, 'dc:date') || textContent(item, 'pubDate') || '',
                content: textContent(item, 'content:encoded') || textContent(item, 'description') || '',
                description: textContent(item, 'description') || '',
                summary: textContent(item, 'description') || ''
            }));
            console.log('[RSS] Parsed as RSS 1.0/RDF, items:', items.length);
            return { title, items };
        }
        
        // Fallback: try generic XML with <item> or <entry> tags
        console.warn('[RSS] Unknown feed format, trying generic parse');
        const channel = xml.getElementsByTagName('channel')[0];
        const title = channel ? textContent(channel, 'title') : textContent(xml, 'title') || srcUrl;
        let items = Array.from(xml.getElementsByTagName('item')).map(item => ({
            title: textContent(item, 'title') || '(no title)',
            link: textContent(item, 'link') || '',
            pubDate: textContent(item, 'pubDate') || textContent(item, 'dc:date') || '',
            content: textContent(item, 'content:encoded') || textContent(item, 'description') || '',
            description: textContent(item, 'description') || '',
            summary: textContent(item, 'description') || ''
        }));
        if (items.length === 0) {
            items = Array.from(xml.getElementsByTagName('entry')).map(entry => ({
                title: textContent(entry, 'title') || '(no title)',
                link: attr(entry.getElementsByTagName('link')[0], 'href') || textContent(entry, 'link') || '',
                pubDate: textContent(entry, 'updated') || textContent(entry, 'published') || '',
                updated: textContent(entry, 'updated') || textContent(entry, 'published') || '',
                content: textContent(entry, 'content') || textContent(entry, 'summary') || '',
                summary: textContent(entry, 'summary') || '',
                description: textContent(entry, 'summary') || ''
            }));
        }
        console.log('[RSS] Generic parse, items:', items.length);
        return { title, items };
    }
    function textContent(parent, tag){ 
        const el = parent?.getElementsByTagName(tag)[0]; 
        return el ? (el.textContent || '').trim() : ''; 
    }
    function attr(el, name){ return el ? el.getAttribute(name) : ''; }

    function parseDateForSort(dateStr){
        if (!dateStr) return new Date(0);
        try {
            return new Date(dateStr);
        } catch {
            return new Date(0);
        }
    }

    function sanitizeHtml(html){
        try {
            const doc = new DOMParser().parseFromString('<div>'+html+'</div>', 'text/html');
            const wrapper = doc.body.firstElementChild;
            wrapper.querySelectorAll('script,style,iframe,noscript').forEach(n=>n.remove());
            // remove on* attributes
            wrapper.querySelectorAll('*').forEach(el=>{
                [...el.attributes].forEach(a=>{ if (/^on/i.test(a.name)) el.removeAttribute(a.name); });
            });
            return wrapper.innerHTML;
        } catch (e) {
            return html.replace(/<script[\s\S]*?<\/script>/gi,'');
        }
    }

    function exportCurrentToPdf(){
        if (!currentModalItem) return;
        const title = currentModalItem.title || 'article';
        // Prefer jsPDF if available
        try {
            const jsPDF = window.jspdf?.jsPDF || window.jsPDF;
            if (jsPDF) {
                const doc = new jsPDF({ unit:'pt', format:'a4' });
                doc.setFont('helvetica',''); doc.setFontSize(14);
                doc.text(title, 40, 40, { maxWidth: 515 });
                const text = modalArticle.innerText || modalArticle.textContent || '';
                doc.setFontSize(11);
                const lines = doc.splitTextToSize(text, 515);
                doc.text(lines, 40, 70);
                const file = (title.replace(/[^a-z0-9\-]+/gi,'-').replace(/-+/g,'-').toLowerCase() || 'article') + '.pdf';
                doc.save(file);
                return;
            }
        } catch(_){}
        // Fallback: open a minimal window and print
        const w = window.open('', '_blank');
        if (!w) { showMsg('Popup blocked'); return; }
        const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title>
        <style>body{font-family:Arial,Helvetica,sans-serif;line-height:1.5;padding:24px;}
        h1{font-size:18px;margin-bottom:12px;} img{max-width:100%;height:auto;}</style></head><body>
        <h1>${escapeHtml(title)}</h1>${modalArticle.innerHTML}</body></html>`;
        w.document.open(); w.document.write(html); w.document.close(); w.focus();
        setTimeout(()=>{ w.print(); }, 300);
    }
    function escapeHtml(s){ return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

    // Events
    rssToggle.addEventListener('click', (e)=>{ e.preventDefault(); if (rssOverlay.classList.contains('hide')) { window.A7LAS_UI?.closeAllExcept?.('rss'); openOverlay(); } else closeOverlay(); });
    window.addEventListener('resize', adjustRssLayout);
    window.addEventListener('keydown', (e)=>{ 
        if (e.key==='Escape') {
            if (modal && !modal.classList.contains('hide')) closeModal();
            else closeOverlay();
        }
    });
    addBtn?.addEventListener('click', ()=>{ addFeed(newUrlInput?.value || ''); });
    newUrlInput?.addEventListener('keydown', (e)=>{ if (e.key==='Enter'){ e.preventDefault(); addFeed(newUrlInput.value); }});
    
    // Modal events
    modalClose?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', closeModal);
    modalOpen?.addEventListener('click', ()=>{ 
        if (currentModalItem && currentModalItem.link) window.open(currentModalItem.link, '_blank'); 
    });
    modalPdf?.addEventListener('click', exportCurrentToPdf);
    
    // Import only (no export button)
    importBtn?.addEventListener('click', ()=> importInput?.click());
    importInput?.addEventListener('change', (e)=>{
        const file = e.target.files && e.target.files[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = () => { 
            try{ 
                const obj = JSON.parse(String(reader.result)); 
                if (obj && Array.isArray(obj.rssFeeds)) { 
                    rssFeeds = obj.rssFeeds; 
                    saveRss(); 
                    if (obj.rssState) { 
                        rssState = obj.rssState; 
                        saveRssState(); 
                    } 
                    renderFeedList(); 
                    renderArticlesList(); 
                    showMsg('RSS imported'); 
                } else { 
                    showMsg('Invalid RSS JSON'); 
                } 
            } catch{ 
                showMsg('Invalid JSON'); 
            } finally { 
                importInput.value=''; 
            } 
        };
        reader.readAsText(file);
    });

    // Expose for backup (Save button uses this)
    window.A7LAS_RSS = {
        getBackup(){ return { rssFeeds, rssState }; },
        restore(data){ 
            if (!data) return; 
            if (Array.isArray(data.rssFeeds)) { 
                rssFeeds = data.rssFeeds; 
                saveRss(); 
            } 
            if (data.rssState) { 
                rssState = data.rssState; 
                saveRssState(); 
            } 
            renderFeedList(); 
            renderArticlesList(); 
        }
    };

    // Init
    loadRss();
    renderFeedList();
    renderArticlesList();
    adjustRssLayout();
})();