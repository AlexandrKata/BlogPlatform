import classes from './tagList.module.scss';

export const TagList = ({ tagList }) => {
  return (
    <ul className={classes.tagList}>
      {tagList.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
};
