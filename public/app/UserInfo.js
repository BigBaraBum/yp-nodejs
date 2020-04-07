class UserInfo {
    constructor(api) {
        this.nameContainer = document.querySelector('.user-info__name');
        this.aboutContainter = document.querySelector('.user-info__job');
        this.avatarContainer = document.querySelector('.user-info__photo');
        this.name = this.nameContainer.textContent;
        this.about = this.aboutContainter.textContent;
        this.api = api;
    }
    setUserInfo(name, about) {
        const body = {
            name: name,
            about: about
        }
        this.api.patchUser(body);
    }
    updateUserInfo() {
        this.api.getUserInfo()
            .then(res => {
                this.nameContainer.textContent = res.name;
                this.aboutContainter.textContent = res.about;
                this.avatarContainer.src = res.avatar;
            });
    }
}