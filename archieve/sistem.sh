#!/bin/bash
echo "--------------------------------------------------"
echo "Activating the QTile repository, Google Chrome repository and RPM Fusion repositories..."
sudo dnf copr enable frostyx/qtile -y
sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm -y
sudo dnf upgrade -y
echo "--------------------------------------------------"

echo "--------------------------------------------------"
echo "The system is being prepared..."
sudo dnf swap ffmpeg-free ffmpeg --allowerasing -y
sudo dnf install @base-x lightdm intel-media-driver ffmpeg-dev ffmpeg-libs lame kitty google-chrome-stable qtile qtile-extras discord git zsh util-linux-user -y
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
sudo systemctl set-default graphical.target
sudo systemctl enable lightdm
echo "--------------------------------------------------"
