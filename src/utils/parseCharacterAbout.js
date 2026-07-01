const FIELD_LABELS = {
  age: 'Age',
  birthday: 'Birthday',
  height: 'Height',
  weight: 'Weight',
  eyeColor: 'Eye Color',
  bloodType: 'Blood type',
  occupation: 'Occupation',
  nenType: 'Nen type',
};

// Jikan's free-text "about" field for HxH characters follows a loose
// "Label: value" convention per line (sourced from the community wiki) before
// the prose biography starts. This extracts just those structured fields;
// the prose itself is not shown on the site since we write our own biography.
export function parseCharacterAbout(about) {
  const result = {};
  if (!about) return result;

  for (const line of about.split('\n')) {
    const match = line.match(/^([A-Za-z ]+):\s*(.+)$/);
    if (!match) continue;
    const [, label, value] = match;
    const trimmedLabel = label.trim();
    const entry = Object.entries(FIELD_LABELS).find(([, l]) => l === trimmedLabel);
    if (entry && value.trim()) {
      result[entry[0]] = value.trim();
    }
  }

  return result;
}
