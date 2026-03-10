export const useAppUI = () => {
    const uiBadgeConfig = {
        base: 'text-[10px] font-bold uppercase px-3 py-1.5 gap-1.5 tracking-wider'
    }

    const uiButtonConfig = {
        base: 'px-5 py-3 text-xs font-semibold uppercase gap-2 rounded-lg',
        leadingIcon: 'size-3.5',
        trailingIcon: 'size-3.5'
    }

    return {
        uiBadgeConfig,
        uiButtonConfig
    }
}
