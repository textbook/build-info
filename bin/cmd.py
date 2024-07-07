"""Generate example CLI for help output."""
from argparse import ArgumentParser, FileType

parser = ArgumentParser(prog="buildinfo")

parser.add_argument("-f", "--format", choices=("json", "text"), default="text", help="the format to provide data in (default: text)")
parser.add_argument("-o", "--output", help="the file to write data to", type=FileType("w"))
parser.add_argument("-v", "--version", action="store_true", help="show the version and exit")

if __name__ == "__main__":
    print(parser.parse_args())
