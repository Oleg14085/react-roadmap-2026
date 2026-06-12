

const apiResponse = {
  data: {
    user: {
      id: 42,
      profile: {
        displayName: "Max",
        avatar: null,
        preferences: { theme: "dark", notifications: true },
      },
    },
    stats: {
      posts: 0,
      followers: undefined,
      isVerified: false,
    },
  },
  meta: { timestamp: 1710000000 },
};

function parseUserProfile(res) {
  const info = {};
  const profile = res?.data?.user?.profile??{};
  const stats = res?.data?.stats??{};
  const{displayName='Гость',avatar=null,preferences={}} = profile;
  const{posts=0,followers=0,isVerified=false} = stats
  const{theme = 'dark',notifications=true} = preferences
  info.id = res?.data?.user?.id??42;
  info.name = displayName;
  info.avatar = avatar??"https://default-avatar.png"
  info.theme = theme
  info.notifications = notifications
  info.postsCount = posts ?? 0;
  info.followersCount = followers ?? 0;
  info.isVerified = isVerified;
  return info;
}

console.log(parseUserProfile(apiResponse));

// Тест 1: полный ответ
console.log('✅ Full:', parseUserProfile(apiResponse));

// Тест 2: профиль = null (твой код упадёт здесь!)
console.log('✅ Null profile:', parseUserProfile({ 
  data: { user: { id: 99, profile: null } } 
}));

// Тест 3: вообще нет data
console.log('✅ Empty:', parseUserProfile({}));

// Тест 4: проверка, что 0 не заменяется
const withZero = parseUserProfile({
  data: { 
    user: { id: 1, profile: { displayName: 'Test' } },
    stats: { posts: 0, followers: undefined }
  }
});
console.log('✅ Zero preserved:', withZero.postsCount === 0); // должно быть true