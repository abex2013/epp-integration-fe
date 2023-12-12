
export type FormControlConfig = {
    nzSm: number,
    nzXs: number
}

export type FormItemConfig = {
    label: FormControlConfig,
    control: FormControlConfig
}

export type FormGroupConfig = {
    [key: string]: FormItemConfig
}


export const defaultFormLabelConfig: FormControlConfig =
{
    nzSm: 6,
    nzXs: 24
}

export const defaultFormControlConfig: FormControlConfig =
{
    nzSm: 14,
    nzXs: 24
}

export const defaultFormItemConfig: FormItemConfig =
{
    label: defaultFormLabelConfig,
    control: defaultFormControlConfig
}
