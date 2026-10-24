"""Generate example CLI for help output."""
from argparse import ArgumentParser, FileType

parser = ArgumentParser(prog="buildinfo")

parser.add_argument(
    "-f", "--format",
    choices=("html", "json", "text"),
    default="text",
    help="the format to provide data in (defaults to json for JSON files, html for HTML files, text otherwise)"
)
parser.add_argument("-o", "--output", help="the file to write data to", type=FileType("w"))
parser.add_argument("-v", "--version", action="version", version="1.2.3")

if __name__ == "__main__":
    print(parser.parse_args())
