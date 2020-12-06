export interface ListItem {
  key: string
  label: string
}

export interface MenuItem extends ListItem {
  icon: string
  to: string
  midNavDir?: string
}

export interface ResumeEntry {
  key: string
  title: string
  subtitle: string
  period: string
  bullets?: ListItem[]
  logo: string
}

export interface SoftwareStackItem extends ListItem {
  level: number
  category: number
}

export interface OptionMap {
  [key: string]: number
}
