export function formatUserData(userData) {
    return {
        id: userData.id || null,
        email: userData.email || null,
        firstName: userData.first_name || null,
        lastName: userData.last_name || null,
        fullName: userData.full_name || null,
        createdAt: userData.created_at || null,
        isActive: userData.is_active || false,
        isAdmin: userData.is_admin || false,
        profilePicture: userData.profile_picture || null
    };
}