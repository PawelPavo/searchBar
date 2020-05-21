
export const getPathText = (pathname: string): string => {

    if (pathname.includes('/details')) {
        pathname = '/details';
    }

    if (pathname.includes('/edit')) {
        pathname = '/edit';
    }

    switch (pathname) {
        case '/':
            return 'Home';
        case '/profile':
            return 'My Profile';
        case '/blog':
            return 'Blog';
        case '/contact':
            return 'Contact Me'
        case '/donate':
            return 'Thank you for your donations'
        case '/login':
            return 'Log In'
        case '/register':
            return 'Register'
        case '/new':
            return 'New Blog'
        default:
            return '';
    }
}