import React from "react";

type TopicListProps = {
  items: {
    title: string;
    description: string;
    titleStyle?: string;
  }[];
};

const TopicList: React.FC<TopicListProps> = ({ items }) => (
  <React.Fragment>
    <ul className="list-disc pl-5 space-y-2 text-gray-700">
      {items.map((item, index) => (
        <li key={index}>
          <strong className={item.titleStyle || "text-blue-600"}>{item.title + ": "}</strong>
          {item.description}
        </li>
      ))}
    </ul>
  </React.Fragment>
);

export default TopicList;
