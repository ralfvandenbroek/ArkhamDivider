import {useEffect} from 'react';

export default function useBodyClass(className: string) {
    useEffect(
        () => {
            // Set up
            document.body.classList.add(className)

            // Clean up
            return () => document.body.classList.remove(className);
        },
        [className]
    );
}
