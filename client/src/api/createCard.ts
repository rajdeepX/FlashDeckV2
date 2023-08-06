import { TDeck } from "../pages/Home";

export async function createCard(noteId: string, text: string): Promise<TDeck> {
  console.log(noteId + "hello");

  const response = await fetch(`http://localhost:5000/notes/${noteId}/note`, {
    method: "POST",
    body: JSON.stringify({
      text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
