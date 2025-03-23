import cv2
import openai
import base64
import time
from datetime import datetime
from supabase import create_client, Client

# OpenAI API key
openai.api_key = "OPENAI API KEY"

# Supabase setup
SUPABASE_URL = "SUPABASE URL"
SUPABASE_KEY = "SUPABASE KEY"
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Convert image to base64
def encode_image(image_path):
    with open(image_path, "rb") as img:
        return base64.b64encode(img.read()).decode("utf-8")

# Use OpenAI Vision to analyze allergens
def analyze_allergens(image_path):
    image_base64 = encode_image(image_path)
    response = openai.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": """You are an allergy detection expert who is able to identify if a dish or food product contains any of the following: Milk, Eggs, Nuts, Gluten, Soy, or Seafood.

You will be presented with an image of one of the following:
1) A picture of a menu, with multiple dishes in frame (will be in text). Your job will be to read the text and identify if each dish typically contains any of the listed allergens, and tell me which allergens apply. 
2) A picture of a food object packaging or dish. You will identify what dish it is, and then determine if that dish usually contains any of the allergens mentioned.

Your response should be concise and formatted like this with only the dish name in the first line, ingredients in the second line (be extremely specific when looking for ingredients, you can search for recipes online and find all of the ingredients if necessary, list them down to the exact seasoning if necessary), and then the list of the allergens in the third line:

DISH NAME  
LIST OF INGREDIENTS  
LIST OF ALLERGENS IN DISH NAME

Example Output:

Smartfood White Cheddar Popcorn  
Popcorn, vegetable oil, cheddar cheese (milk, cheese cultures, salt, enzymes), whey, buttermilk, natural flavor, salt.  
Milk

If you cannot identify the dish or product, ONLY respond with:  
"Try another angle or get closer to the label."  
"""},

            {"role": "user", "content": [
                {"type": "text", "text": "Here is an image for analysis:"},
                {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{image_base64}"}}
            ]}
        ],
        max_tokens=600
    )
    return response.choices[0].message.content

# Delete everything in the Supabase table
def clear_supabase_table():
    try:
        supabase.table("allergen_results").delete().neq("id", -1).execute()
        print("Table cleared before new run.")
    except Exception as e:
        print("Failed to clear table:", e)

# Store dish info in Supabase
def store_in_supabase(dish_name, ingredients, allergens):
    data = {
        "dish_name": dish_name,
        "ingredients": ingredients,
        "allergens": allergens,
        "created_at": datetime.utcnow().isoformat()
    }

    try:
        response = supabase.table("allergen_results").insert(data).execute()
        if response.data:
            print(f"Uploaded '{dish_name}' to Supabase.")
        else:
            print("Upload returned no data:", response)
    except Exception as e:
        print("Supabase upload failed:", e)

# Open virtual camera
cap = cv2.VideoCapture(1, cv2.CAP_DSHOW)
WIDTH, HEIGHT = 1280, 720
cap.set(cv2.CAP_PROP_FRAME_WIDTH, WIDTH)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, HEIGHT)

if not cap.isOpened():
    print("Error: Could not open OBS Virtual Camera.")
    exit()

last_capture_time = time.time()

while True:
    ret, frame = cap.read()
    if not ret:
        print("Error: Failed to capture frame.")
        break

    cv2.imshow("OBS Virtual Camera Feed", frame)

    if time.time() - last_capture_time >= 15:
        cv2.imwrite("frame.jpg", frame)
        print("Frame captured. Analyzing...")

        try:
            # CLEAR table before analyzing this new frame
            clear_supabase_table()

            result = analyze_allergens("frame.jpg")
            print("OpenAI Result:\n", result)

            # Split into blocks of dishes
            blocks = result.strip().split("\n\n")
            for block in blocks:
                lines = block.strip().splitlines()
                if len(lines) >= 3:
                    dish_name = lines[0].strip()
                    ingredients = lines[1].strip()
                    allergens = lines[2].strip()
                    store_in_supabase(dish_name, ingredients, allergens)
                else:
                    print("Skipped invalid block:\n", block)

        except openai.OpenAIError as e:
            print("OpenAI Error:", e)

        last_capture_time = time.time()

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
