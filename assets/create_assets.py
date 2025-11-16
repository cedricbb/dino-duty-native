#!/usr/bin/env python3
"""
Script pour créer des assets temporaires pour DinoDuty
Utilise PIL (Pillow) pour créer des images simples
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    import os
    
    # Couleur principale de l'app
    PRIMARY_COLOR = (16, 185, 129)  # #10b981
    WHITE = (255, 255, 255)
    
    # Créer le dossier assets s'il n'existe pas
    os.makedirs('assets', exist_ok=True)
    
    print("🦕 Création des assets pour DinoDuty...")
    
    # 1. Créer icon.png (1024x1024)
    print("📱 Création de icon.png...")
    icon = Image.new('RGB', (1024, 1024), PRIMARY_COLOR)
    draw = ImageDraw.Draw(icon)
    
    # Ajouter un cercle blanc au centre
    circle_margin = 200
    draw.ellipse([circle_margin, circle_margin, 1024-circle_margin, 1024-circle_margin], 
                 fill=WHITE, outline=PRIMARY_COLOR, width=20)
    
    # Ajouter du texte
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 150)
    except:
        font = ImageFont.load_default()
    
    text = "DD"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (1024 - text_width) // 2
    y = (1024 - text_height) // 2
    draw.text((x, y), text, fill=PRIMARY_COLOR, font=font)
    
    icon.save('assets/icon.png')
    print("✅ icon.png créé")
    
    # 2. Créer splash.png (1242x2436)
    print("🎨 Création de splash.png...")
    splash = Image.new('RGB', (1242, 2436), PRIMARY_COLOR)
    draw = ImageDraw.Draw(splash)
    
    # Titre
    try:
        title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 120)
    except:
        title_font = ImageFont.load_default()
    
    title = "DinoDuty"
    bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = bbox[2] - bbox[0]
    x = (1242 - title_width) // 2
    y = 1000
    draw.text((x, y), title, fill=WHITE, font=title_font)
    
    # Sous-titre
    try:
        subtitle_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 60)
    except:
        subtitle_font = ImageFont.load_default()
    
    subtitle = "Fais eclore ton dinosaure !"
    bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    subtitle_width = bbox[2] - bbox[0]
    x = (1242 - subtitle_width) // 2
    y = 1200
    draw.text((x, y), subtitle, fill=WHITE, font=subtitle_font)
    
    splash.save('assets/splash.png')
    print("✅ splash.png créé")
    
    # 3. Créer adaptive-icon.png (copie de icon)
    print("📱 Création de adaptive-icon.png...")
    icon.save('assets/adaptive-icon.png')
    print("✅ adaptive-icon.png créé")
    
    # 4. Créer favicon.png (48x48)
    print("🌐 Création de favicon.png...")
    favicon = icon.resize((48, 48), Image.Resampling.LANCZOS)
    favicon.save('assets/favicon.png')
    print("✅ favicon.png créé")
    
    print("\n🎉 Tous les assets ont été créés avec succès !")
    print("📁 Vérifiez le dossier 'assets/'")
    print("\n💡 Vous pouvez maintenant lancer : npm start")
    
except ImportError:
    print("❌ Erreur : Pillow n'est pas installé")
    print("\n📦 Pour installer Pillow :")
    print("   pip install Pillow")
    print("\n   ou")
    print("   pip3 install Pillow")
    print("\n💡 Alternative : Créez les images manuellement avec n'importe quel éditeur d'images")
    print("   - icon.png (1024x1024)")
    print("   - splash.png (1242x2436)")
    print("   - adaptive-icon.png (1024x1024)")
    print("   - favicon.png (48x48)")
    
except Exception as e:
    print(f"❌ Erreur lors de la création des assets : {e}")
    print("\n💡 Créez les images manuellement avec n'importe quel éditeur d'images")
