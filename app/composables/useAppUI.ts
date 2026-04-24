export const useAppUI = () => {
    const uiBadgeConfig = {
        base: 'text-[10px] font-bold uppercase px-3 py-1.5 gap-1.5 tracking-wider'
    }

    const uiButtonConfig = {
        base: 'px-5 py-3 text-xs font-bold uppercase gap-2 rounded-lg',
        leadingIcon: 'size-4',
        trailingIcon: 'size-4'
    }

    return {
        uiBadgeConfig,
        uiButtonConfig
    }
}
