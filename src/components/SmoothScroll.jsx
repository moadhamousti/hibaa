// utils/smoothScroll.js
export const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      window.scrollTo({
        behavior: 'smooth',
        top: element.offsetTop,
      });
    } else {
      const hash = `#${elementId}`;
      window.location.href = hash;
      // If you are using Next.js, you can use the following to navigate:
      // router.push(hash);
    }
  };