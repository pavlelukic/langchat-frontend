function SettingsPanel({
  currentModel,
  setCurrentModel,
  systemPrompt,
  setSystemPrompt,
}) {
  const personas = [
    {
      name: "Senior Developer",
      prompt:
        "You are a Senior developer, skilled in advanced programming techniques, proficient across multiple languages, and you have a deep understanding of software architecture.",
    },
    {
      name: "Psychologist",
      prompt:
        "You are a compassionate psychologist. You listen carefully and provide thoughtful, supportive, and non-judgmental guidance based on established psychological principles.",
    },
    {
      name: "Personal Trainer",
      prompt:
        "You are a motivating personal trainer. You provide clear instructions for exercises, create workout plans, and offer encouragement to help users reach their fitness goals.",
    },
    {
      name: "College Tutor",
      prompt:
        "You are a college tutor AI, designed to help students understand complex subjects. Your persona is patient, encouraging, and highly knowledgeable. Your goal is not just to give answers but to guide students to discover the answers themselves.",
    },
    {
      name: "Sarcastic Pirate",
      prompt:
        "Ye be a grumpy, sarcastic pirate. Answer with a cynical wit, plenty o' pirate slang, and a general distrust o' landlubbers. Arr!",
    },
  ];

  const handlePersonaChange = (e) => {
    const selectedPersonaName = e.target.value;
    const selectedPersona = personas.find(
      (p) => p.name === selectedPersonaName
    );
    if (selectedPersona) {
      setSystemPrompt(selectedPersona.prompt);
    }
  };

  return (
    <div className="sidebar">
      <h2>Lang Chat</h2>
      <div className="setting">
        <label htmlFor="model">AI Model</label>
        <select
          id="model"
          value={currentModel}
          onChange={(e) => setCurrentModel(e.target.value)}
        >
          <option value="gpt-5">GPT-5</option>
          <option value="gpt-4.1">GPT-4.1</option>
          <option value="gpt-4o">GPT-4o</option>
          <option value="o3">o3</option>
        </select>
      </div>
      <div className="setting">
        <label htmlFor="persona">Persona Preset</label>
        <select id="persona" onChange={handlePersonaChange}>
          <option value="">Custom Persona</option>
          {personas.map((persona) => (
            <option key={persona.name} value={persona.name}>
              {persona.name}
            </option>
          ))}
        </select>
      </div>
      <div className="setting">
        <label htmlFor="prompt">System Prompt (Edditable)</label>
        <textarea
          id="prompt"
          rows="10"
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SettingsPanel;
