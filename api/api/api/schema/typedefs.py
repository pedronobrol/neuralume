from dataclasses import dataclass
from typing import Optional


@dataclass
class AuthToken:
    token: str
    refresh_token: str


@dataclass
class RequestTokenResponse:
    success: bool
    error_message: Optional[str] = None
    auth_token: Optional[AuthToken] = None


@dataclass
class VerifyTokenResponse:
    isValid: bool
    email: Optional[str] = None


@dataclass
class CreateMeasurementResponse:
    success: bool
    error_message: Optional[str] = None
