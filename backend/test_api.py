"""
Test script for Climate360 API endpoints
Run this after starting the backend: python backend/test_api.py
"""

import requests
import json
from datetime import datetime

# API Base URL
API_URL = "http://localhost:8000/api"

# ANSI Colors for output
class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'

def print_result(test_name, success, message=""):
    status = f"{Colors.GREEN}✓ PASS{Colors.END}" if success else f"{Colors.RED}✗ FAIL{Colors.END}"
    print(f"{status} - {test_name}")
    if message:
        print(f"  {Colors.YELLOW}→ {message}{Colors.END}")

def print_section(title):
    print(f"\n{Colors.BLUE}{'='*60}{Colors.END}")
    print(f"{Colors.BLUE}{title}{Colors.END}")
    print(f"{Colors.BLUE}{'='*60}{Colors.END}\n")

def test_health():
    """Test health endpoint"""
    try:
        response = requests.get(f"{API_URL}/health", timeout=5)
        success = response.status_code == 200
        print_result("Health Check", success, f"Status: {response.status_code}")
        if success:
            data = response.json()
            print(f"  Service: {data.get('service')}")
            print(f"  Status: {data.get('status')}")
        return success
    except Exception as e:
        print_result("Health Check", False, str(e))
        return False

def test_status():
    """Test status endpoint"""
    try:
        response = requests.get(f"{API_URL}/status", timeout=5)
        success = response.status_code == 200
        print_result("Status Endpoint", success, f"Status: {response.status_code}")
        if success:
            data = response.json()
            print(f"  Version: {data.get('version')}")
        return success
    except Exception as e:
        print_result("Status Endpoint", False, str(e))
        return False

def test_heat_risk():
    """Test heat risk assessment"""
    try:
        params = {
            "temperature": 38,
            "humidity": 72,
            "wind": 3,
            "solar_radiation": 800,
            "wbgt": 31.5
        }
        response = requests.post(f"{API_URL}/climate/risk/heat", params=params, timeout=10)
        success = response.status_code == 200
        print_result("Heat Risk Assessment", success, f"Status: {response.status_code}")
        
        if success:
            data = response.json()
            risk_level = data.get('risk_level')
            print(f"  Risk Level: {risk_level}")
            print(f"  Temperature: {data['details']['temperature']}°C")
            print(f"  WBGT: {data['details']['wbgt']}°C")
            print(f"  Explanation preview: {data.get('explanation', '')[:100]}...")
        return success
    except Exception as e:
        print_result("Heat Risk Assessment", False, str(e))
        return False

def test_water_risk():
    """Test water stress assessment"""
    try:
        params = {
            "recent_rainfall": 15,
            "historical_avg_rainfall": 20,
            "current_storage": 1000,
            "daily_demand": 100,
            "forecast_rainfall": 10,
            "roof_area": 100
        }
        response = requests.post(f"{API_URL}/climate/risk/water", params=params, timeout=10)
        success = response.status_code == 200
        print_result("Water Risk Assessment", success, f"Status: {response.status_code}")
        
        if success:
            data = response.json()
            stress_level = data.get('stress_level')
            harvesting = data.get('harvesting_potential')
            print(f"  Stress Level: {stress_level}")
            print(f"  Harvesting Potential: {harvesting} L")
            print(f"  Days of Supply: {data['details']['days_of_supply']} days")
            print(f"  Explanation preview: {data.get('explanation', '')[:100]}...")
        return success
    except Exception as e:
        print_result("Water Risk Assessment", False, str(e))
        return False

def test_rain_risk():
    """Test extreme rain risk assessment"""
    try:
        params = {
            "current_rainfall": 45,
            "rainfall_intensity": 45,
            "historical_baseline": 15,
            "cumulative_24h": 120
        }
        response = requests.post(f"{API_URL}/climate/risk/rain", params=params, timeout=10)
        success = response.status_code == 200
        print_result("Rain Risk Assessment", success, f"Status: {response.status_code}")
        
        if success:
            data = response.json()
            risk_level = data.get('risk_level')
            anomaly_factor = data['details']['anomaly_factor']
            print(f"  Risk Level: {risk_level}")
            print(f"  Anomaly Factor: {anomaly_factor}x normal")
            print(f"  Rainfall Intensity: {data['details']['rainfall_intensity']} mm/h")
            print(f"  Explanation preview: {data.get('explanation', '')[:100]}...")
        return success
    except Exception as e:
        print_result("Rain Risk Assessment", False, str(e))
        return False

def test_dashboard():
    """Test complete dashboard endpoint"""
    try:
        params = {
            "temperature": 32,
            "humidity": 70,
            "wind": 6,
            "rainfall": 5,
            "wbgt": 28.5,
            "solar_radiation": 700,
            "recent_rainfall": 18,
            "historical_avg_rainfall": 22,
            "current_storage": 1200,
            "historical_baseline_rain": 12,
            "rainfall_intensity": 8
        }
        response = requests.post(f"{API_URL}/climate/dashboard", params=params, timeout=15)
        success = response.status_code == 200
        print_result("Dashboard (All Risks)", success, f"Status: {response.status_code}")
        
        if success:
            data = response.json()
            print(f"  Heat Risk: {data['heat']['risk_level']}")
            print(f"  Water Stress: {data['water']['stress_level']}")
            print(f"  Rain Risk: {data['rain']['risk_level']}")
            print(f"  Temperature: {data['current_conditions']['temperature']}°C")
            print(f"  All three risk explanations included: Yes")
        return success
    except Exception as e:
        print_result("Dashboard (All Risks)", False, str(e))
        return False

def test_conduit_status():
    """Test Conduit API status"""
    try:
        response = requests.get(f"{API_URL}/conduit/status", timeout=10)
        success = response.status_code == 200
        print_result("Conduit API Status", success, f"Status: {response.status_code}")
        
        if success:
            data = response.json()
            status = data.get('status')
            message = data.get('message')
            print(f"  Status: {status}")
            print(f"  Message: {message}")
        return success
    except Exception as e:
        print_result("Conduit API Status", False, str(e))
        return False

def run_all_tests():
    """Run all tests"""
    print_section("Climate360 API Test Suite")
    print(f"Testing API at: {API_URL}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    
    results = []
    
    print_section("1. Basic Health Checks")
    results.append(("Health Check", test_health()))
    results.append(("Status Endpoint", test_status()))
    
    print_section("2. Risk Engine Tests")
    results.append(("Heat Risk", test_heat_risk()))
    results.append(("Water Risk", test_water_risk()))
    results.append(("Rain Risk", test_rain_risk()))
    
    print_section("3. Integration Tests")
    results.append(("Complete Dashboard", test_dashboard()))
    results.append(("Conduit API Status", test_conduit_status()))
    
    print_section("Test Summary")
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = f"{Colors.GREEN}✓{Colors.END}" if result else f"{Colors.RED}✗{Colors.END}"
        print(f"{status} {test_name}")
    
    print(f"\n{Colors.BLUE}{'='*60}{Colors.END}")
    if passed == total:
        print(f"{Colors.GREEN}All {total} tests PASSED! ✓{Colors.END}")
    else:
        print(f"{Colors.YELLOW}{passed}/{total} tests passed{Colors.END}")
    print(f"{Colors.BLUE}{'='*60}{Colors.END}\n")
    
    return passed == total

if __name__ == "__main__":
    try:
        success = run_all_tests()
        exit(0 if success else 1)
    except KeyboardInterrupt:
        print(f"\n{Colors.YELLOW}Tests interrupted by user{Colors.END}")
        exit(1)
    except Exception as e:
        print(f"{Colors.RED}Unexpected error: {e}{Colors.END}")
        exit(1)
