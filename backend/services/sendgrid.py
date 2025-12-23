"""
SendGrid Service - Email sending and tracking
"""
import httpx
from typing import Optional, List, Dict, Any
from datetime import datetime

from core.config import settings


class SendGridService:
    BASE_URL = "https://api.sendgrid.com/v3"

    def __init__(self):
        self.api_key = settings.SENDGRID_API_KEY
        self.from_email = settings.SENDGRID_FROM_EMAIL
        self.from_name = settings.SENDGRID_FROM_NAME
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

    async def send_email(
        self,
        to_email: str,
        to_name: str,
        subject: str,
        html_content: str,
        text_content: Optional[str] = None,
        reply_to: Optional[str] = None,
        custom_args: Optional[Dict[str, str]] = None
    ) -> Dict[str, Any]:
        """
        Send a single email via SendGrid

        Args:
            to_email: Recipient email address
            to_name: Recipient name
            subject: Email subject
            html_content: HTML body
            text_content: Plain text body (optional)
            reply_to: Reply-to address (defaults to from_email)
            custom_args: Custom arguments for tracking (contact_id, sequence_id, etc.)

        Returns:
            Dict with 'success', 'message_id', 'error' keys
        """
        data = {
            "personalizations": [{
                "to": [{"email": to_email, "name": to_name}],
                "custom_args": custom_args or {}
            }],
            "from": {
                "email": self.from_email,
                "name": self.from_name
            },
            "reply_to": {
                "email": reply_to or self.from_email
            },
            "subject": subject,
            "content": [
                {"type": "text/html", "value": html_content}
            ],
            "tracking_settings": {
                "click_tracking": {"enable": True},
                "open_tracking": {"enable": True}
            }
        }

        if text_content:
            data["content"].insert(0, {"type": "text/plain", "value": text_content})

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.BASE_URL}/mail/send",
                    headers=self.headers,
                    json=data,
                    timeout=30.0
                )

                if response.status_code in [200, 202]:
                    # Get message ID from headers
                    message_id = response.headers.get("X-Message-Id", "")
                    return {
                        "success": True,
                        "message_id": message_id,
                        "error": None
                    }
                else:
                    return {
                        "success": False,
                        "message_id": None,
                        "error": f"SendGrid error: {response.status_code} - {response.text}"
                    }

        except Exception as e:
            return {
                "success": False,
                "message_id": None,
                "error": str(e)
            }

    async def send_batch_emails(
        self,
        emails: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        """
        Send multiple emails (sequentially, not batch API)
        Each email dict should have: to_email, to_name, subject, html_content

        Returns list of results for each email
        """
        results = []
        for email_data in emails:
            result = await self.send_email(**email_data)
            result["to_email"] = email_data.get("to_email")
            results.append(result)
        return results

    async def validate_email(self, email: str) -> Dict[str, Any]:
        """
        Validate email address using SendGrid Email Validation API
        Requires SendGrid Email Validation add-on
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.BASE_URL}/validations/email",
                    headers=self.headers,
                    json={"email": email},
                    timeout=30.0
                )

                if response.status_code == 200:
                    data = response.json()
                    result = data.get("result", {})
                    return {
                        "valid": result.get("verdict") == "Valid",
                        "score": result.get("score", 0),
                        "verdict": result.get("verdict"),
                        "email": email
                    }
                else:
                    return {
                        "valid": None,
                        "error": f"Validation error: {response.status_code}"
                    }

        except Exception as e:
            return {
                "valid": None,
                "error": str(e)
            }


class EmailBuilder:
    """Helper class to build email content with consistent styling"""

    @staticmethod
    def wrap_html(content: str, include_footer: bool = True) -> str:
        """Wrap content in a simple, clean email template"""
        footer = """
        <p style="color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            Axel Berard | Sales Manager Europe<br>
            eco₂Veritas | Sustainability Verification Platform<br>
            <a href="https://www.eco2veritas.com" style="color: #0066cc;">www.eco2veritas.com</a>
        </p>
        """ if include_footer else ""

        return f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            {content}
            {footer}
        </body>
        </html>
        """

    @staticmethod
    def html_to_text(html: str) -> str:
        """Simple HTML to plain text conversion"""
        import re
        # Remove HTML tags
        text = re.sub(r'<br\s*/?>', '\n', html)
        text = re.sub(r'<p[^>]*>', '\n', text)
        text = re.sub(r'</p>', '\n', text)
        text = re.sub(r'<[^>]+>', '', text)
        # Clean up whitespace
        text = re.sub(r'\n\s*\n', '\n\n', text)
        return text.strip()
