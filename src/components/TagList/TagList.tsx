import classes from './TagList.module.scss'

interface Props {
  tagList: string[]
}

export const TagList = ({ tagList }: Props) => {
  return (
    <ul className={classes.tagList}>
      {tagList.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}
