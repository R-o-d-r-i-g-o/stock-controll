type TermProps = {
  topicName: string;
  terms: {
    id: number;
    desc?: string;
    title: string;
    topics?: {
      id: number;
      desc: string;
      title?: string;
    }[];
  }[];
};

const Terms: React.FC<TermProps> = ({ topicName, terms }) => (
  <div className="w-full">
    <h1 className="text-4xl font-bold mb-6">{topicName}</h1>
    {terms.map((t) => (
      <div key={t.id}>
        <h2 className="text-2xl font-bold mb-4">{t.title}</h2>
        <p className="mb-6">{t.desc}</p>
        {t.topics && t.topics.length > 0 && (
          <ul className="list-disc pl-8 mb-6">
            {t.topics.map((topic) => (
              <li key={topic.id} className="mb-3">
                <h3 className="text-lg font-bold mb-2">{topic.title}</h3>
                <p>{topic.desc}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
);

export default Terms;
