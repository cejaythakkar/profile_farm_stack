from pathlib import Path

from jinja2 import Environment, FileSystemLoader
import httpx

# from weasyprint import HTML, CSS
# from playwright.async_api import async_playwright


BASE_DIR = Path(__file__).resolve().parent

TEMPLATE_DIR = BASE_DIR / "templates"
CSS_FILE = BASE_DIR / "static" / "resume.css"
OUTPUT_DIR = BASE_DIR / "output"
GOTENBERG_URL = "http://localhost:3003/forms/chromium/convert/html"

OUTPUT_DIR.mkdir(exist_ok=True)


async def generateResume(profile):

    env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))
    template = env.get_template("modern_resume.html")
    css = CSS_FILE.read_text(encoding="utf-8")
    # print(profile)
    html = template.render(
        userDetails=profile["userDetails"],
        personalDetails=profile["personalDetails"],
        skills=profile["skills"],
        experiences=profile["experiences"],
        projects=profile["projects"],
        profile=profile,
        css=css,
    )
    # print(CSS_FILE.exists())
    # print(html)
    pdf_path = OUTPUT_DIR / f"{profile['userDetails']['userName']}.html"

    # HTML(
    #     string=html,
    #     base_url=str(BASE_DIR)
    # ).write_pdf(
    #     pdf_path,
    #     stylesheets=[
    #         CSS(filename=str(CSS_FILE))
    #     ]
    # )
    # print(CSS_FILE.read_bytes())
    pdf_path.write_bytes(html.encode("utf-8"));
    
    files = [("files", ("index.html", html.encode("utf-8"), "text/html"))]

    async with httpx.AsyncClient(timeout=60) as client:
        response = await client.post(GOTENBERG_URL, files=files)

    response.raise_for_status()

    return response.content
